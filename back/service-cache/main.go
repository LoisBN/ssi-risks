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
)

func main()  {
    var wait time.Duration

    flag.DurationVar(&wait,"wait",time.Second*10,"the duration for which the server gracefully wait for connection to finish")
    flag.Parse()

    r := mux.NewRouter()
    r.Use(mux.CORSMethodMiddleware(r))
    r.HandleFunc("/project/init",NewProject).Methods("OPTION","GET","POST")
    r.HandleFunc("/projects",GetAll).Methods("GET")
    r.HandleFunc("/project/get/{name}",GetProject).Methods("GET")
    r.HandleFunc("/project/update/{name}",UpdateProject).Methods("PUT","PATCH")
    r.HandleFunc("/project/delete/{name}",DeleteProject).Methods("GET")
    r.HandleFunc("/",test)

    srv := &http.Server{
        Handler: r,
        Addr: ":8000",
        WriteTimeout: 10*time.Second,
        ReadHeaderTimeout: 10*time.Second,
        ReadTimeout: 10*time.Second,
    }

    srv.SetKeepAlivesEnabled(true)
    srv.RegisterOnShutdown(func() {
        fmt.Println("the server has been gracefully stopped")
    })

    go func ()  {
        if err := srv.ListenAndServe(); err != nil {
            log.Println(err.Error())
        }
    }()

    c := make(chan os.Signal,1)

    signal.Notify(c,os.Interrupt)

    <-c

    ctx,cancel := context.WithTimeout(context.Background(),wait)
    defer cancel()

    srv.Shutdown(ctx)

    log.Println("shutting down")

    os.Exit(0)
}

func test(w http.ResponseWriter,req *http.Request) {
    fmt.Fprintln(w,"this is the cache microservice")
}
