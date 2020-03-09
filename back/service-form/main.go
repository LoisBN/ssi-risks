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

const (
	hosts      = "mongodb:27017"
	database   = "db"
	username   = ""
	password   = ""
	collection = "jobs"
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
    r.HandleFunc("/save/{name}",saveFormData)
    r.HandleFunc("/fetch/{name}",fetchFormValue)

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
	info := &mgo.DialInfo{
		Addrs:    []string{hosts},
		Timeout:  60 * time.Second,
		Database: database,
		Username: username,
		Password: password,
	}

	s, err := mgo.DialWithInfo(info)
	if err != nil {
		log.Println("erreur mongo")
	}
	return s
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}