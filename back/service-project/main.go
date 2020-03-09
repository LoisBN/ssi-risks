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

func main() {
	var wait time.Duration

	flag.DurationVar(&wait, "wait", time.Second*10, "the duration for which the server gracefully wait for connection to finish")
	flag.Parse()

	r := mux.NewRouter()
	r.Use(mux.CORSMethodMiddleware(r))
	r.HandleFunc("/project/init", NewProject).Methods("OPTION", "GET", "POST", "OPTIONS")
	r.HandleFunc("/projects", GetAll).Methods("GET", "OPTIONS")
	r.HandleFunc("/project/get/{name}", GetProject).Methods("GET", "OPTIONS")
	r.HandleFunc("/project/update/{name}", UpdateProject).Methods("PUT", "PATCH", "OPTIONS")
	r.HandleFunc("/project/delete/{name}", DeleteProject).Methods("GET", "OPTIONS")
	r.HandleFunc("/project/save/{name}", SaveProject).Methods("POST", "OPTIONS")
	r.HandleFunc("/projects/fetchSaved",GetAllFromDB)
	r.HandleFunc("/", test)

	srv := &http.Server{
		Handler:           r,
		Addr:              ":8000",
		WriteTimeout:      10 * time.Second,
		ReadHeaderTimeout: 10 * time.Second,
		ReadTimeout:       10 * time.Second,
	}

	srv.SetKeepAlivesEnabled(true)
	srv.RegisterOnShutdown(func() {
		fmt.Println("the server has been gracefully stopped")
	})

	go func() {
		if err := srv.ListenAndServe(); err != nil {
			log.Println(err.Error())
		}
	}()

	c := make(chan os.Signal, 1)

	signal.Notify(c, os.Interrupt)

	<-c

	ctx, cancel := context.WithTimeout(context.Background(), wait)
	defer cancel()

	srv.Shutdown(ctx)

	log.Println("shutting down")

	os.Exit(0)
}

func test(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintln(w, "this is the cache microservice")
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
