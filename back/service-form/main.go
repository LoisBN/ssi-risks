package main

import (
	"context"
	"flag"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2"
)

func main()  {
    var wait time.Duration

    flag.DurationVar(&wait,"wait",15*time.Second,"the time which the server gracefully wait for connection to end")
    flag.Parse()

    r := mux.NewRouter()
    r.Use(mux.CORSMethodMiddleware(r))
    r.HandleFunc("/besoinSec",BesoinSecForm)
    r.HandleFunc("/homologation",Homologation)
    r.HandleFunc("/impacts",ImpactsForm)
    r.HandleFunc("/menaces",MenacesForm)
    r.HandleFunc("/importanceVuln",ImportanceVulnForm)

    srv := &http.Server{
        Handler: r,
        Addr: ":8300",
        ReadTimeout: 10*time.Second,
        WriteTimeout: 15*time.Second,
        ReadHeaderTimeout: 10*time.Second,
    }

    go func ()  {
        if err := srv.ListenAndServe(); err != nil {
            log.Println(err.Error())
        }
    }()

    c := make(chan os.Signal,1)

    signal.Notify(c,os.Interrupt)

    <-c

    ctx,cancel := context.WithTimeout(context.Background(),wait)

    cancel()

    if err := srv.Shutdown(ctx); err != nil {
        log.Println("error while shutdown")
        return
    }

    log.Println("shutting down gracefully")

    os.Exit(0)

}

func getSession() *mgo.Session {
	session, err := mgo.Dial("mongodb://localhost:27017")
	if err != nil {
		log.Println(err.Error())
		return nil
	}
	return session
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}