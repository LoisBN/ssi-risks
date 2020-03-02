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

    flag.DurationVar(&wait,"wait",15*time.Second,"the time which the server gracefully for connection to finish")
    flag.Parse()

    r := mux.NewRouter()
    r.Use(mux.CORSMethodMiddleware(r))
    r.HandleFunc("/signup",signup).Methods("POST")
    r.HandleFunc("/login",login).Methods("POST")
    r.HandleFunc("/autologin",autolog).Methods("POST")


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
    session,err := mgo.Dial("mongodb://localhost:27017")
    if err != nil {
        log.Println(err.Error())
        return nil
    }
    return session
}