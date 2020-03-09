package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/go-redis/redis"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2/bson"
)

func Signup(w http.ResponseWriter,req *http.Request) {
    setupResponse(&w,req)
    if req.Method == "OPTIONS" {
        return
    }
    var p Profile

    bs,err := ioutil.ReadAll(req.Body)
    if err != nil {
        log.Println(err.Error())
        return
    }
    err = json.Unmarshal(bs,&p)
    if err != nil {
        log.Println(err.Error())
        return
    }
    //err = getSession().DB("SSI").C("users").Insert(p)
    found := getSession().DB("SSI").C("users").Find(bson.M{"username":p.Username}).One(nil)
    if found == nil {
        errMess := map[string]string{
            "message": "username already in use",
        }
        w.WriteHeader(422)
        err = json.NewEncoder(w).Encode(&errMess)
        if err != nil {
            log.Println("failed to send the response")
        }
        return
    }

    found = getSession().DB("SSI").C("users").Find(bson.M{"email":p.Email}).One(nil)
    if found == nil {
        errMess := map[string]string{
            "message": "email already in use",
        }
        w.WriteHeader(422)
        err = json.NewEncoder(w).Encode(&errMess)
        if err != nil {
            log.Println("failed to send the response")
        }
        return
    }

    ps,err := bcrypt.GenerateFromPassword([]byte(p.Password),bcrypt.DefaultCost)
    if err != nil {
        log.Println(err.Error())
        return
    }
    p.Password = string(ps)
    if p.Username == "admin" {
        p.Admin = true
    } else {
        p.Admin = false
    }

    p.Date = time.Now()

    err = getSession().DB("SSI").C("users").Insert(p)
    client := redis.NewClient(&redis.Options{
        Addr: "redis:6379",
        Password: "",
        DB: 0,
    })

    UUID,err := uuid.NewUUID()

    client.Set(UUID.String(),p.Username,24*time.Hour)
    err = json.NewEncoder(w).Encode(map[string]interface{}{
            "email": p.Email,
            "username": p.Username,
            "admin":p.Admin,
            "access_token": UUID.String(),
        })
}