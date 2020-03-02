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

    flag.DurationVar(&wait,"wait",15*time.Second,"the time which the server gracefully wait for connection to end")
    flag.Parse()

    r := mux.NewRouter()
    r.Use(mux.CORSMethodMiddleware(r))

    srv := http.Server{
        Addr: ":7000",
        ReadHeaderTimeout: 5*time.Second,
        ReadTimeout: 15*time.Second,
        WriteTimeout: 15*time.Second,
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

    if err := srv.Shutdown(ctx);err != nil {
        log.Println(err.Error())
        return
    }

    log.Println("shutdown gratefully")

    os.Exit(0)
}

func test(w http.ResponseWriter,req *http.Request) {
    fmt.Fprintln(w,"this is a test")
} 