package main

import (
	"context"
	"flag"
	"fmt"
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

    flag.DurationVar(&wait,"wait",15*time.Second,"the time which the server gracefully for connection to finish")
    flag.Parse()

    r := mux.NewRouter()
    r.Use(mux.CORSMethodMiddleware(r))
    r.HandleFunc("/signup",Signup).Methods("POST","OPTIONS")
    r.HandleFunc("/login",Login).Methods("OPTIONS","POST")
    r.HandleFunc("/autologin",Autolog).Methods("POST","OPTIONS")
    


    srv := &http.Server{
        Addr: ":8100",
        ReadTimeout: wait,
        WriteTimeout: wait,
        ReadHeaderTimeout: wait,
        Handler: r,
    }

    go func ()  {
        if err := srv.ListenAndServe();err != nil {
            log.Println(err.Error())
            return
        }
    }()

    c := make(chan os.Signal,1)

    signal.Notify(c,os.Interrupt)

    <-c

    ctx,cancel := context.WithTimeout(context.Background(),wait)
    
    cancel()

    if err := srv.Shutdown(ctx); err != nil {
        log.Println(err.Error())
        return
    }

    log.Println("shuting down...")

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
		fmt.Println("erreur mongo")
	}
	return s
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
    (*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}