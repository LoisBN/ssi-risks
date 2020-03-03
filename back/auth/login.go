package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/go-redis/redis/v7"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2/bson"
)

func Login(w http.ResponseWriter,req *http.Request)  {
    setupResponse(&w,req)
    if req.Method == "OPTIONS" { 
 	    return 
    }
    if req.Method == "POST" {
        var l LoginFormData
        bs,err := ioutil.ReadAll(req.Body)
        if err != nil {
            log.Println(err.Error())
            http.Error(w,"cannot read the request body",http.StatusInternalServerError)
            return
        }
        err = json.Unmarshal(bs,&l)
        if err != nil {
            log.Println(err.Error())
            http.Error(w,"cannot unmarshal the request body",http.StatusInternalServerError)
            return
        }
        fmt.Println(l)
        var u Profile
        err = getSession().DB("SSI").C("users").Find(bson.D{{"$or",[]bson.D{
                bson.D{{"email",l.Identifier}},
                bson.D{{"username",l.Identifier}}}}}).One(&u)
        if err != nil {
            log.Println("no user correspond")
            http.Error(w,"invalid credidential",http.StatusUnauthorized)
            return
        }

        err = bcrypt.CompareHashAndPassword([]byte(u.Password),[]byte(l.Password))
        if err != nil {
            log.Println("wrong password")
            http.Error(w,"invalid credidential",http.StatusUnauthorized)
            return
        }

        client := redis.NewClient(&redis.Options{
            Addr: ":6379",
            Password: "",
            DB: 0,
        })

        UUID,err := uuid.NewUUID()
        if err != nil {
            log.Println(err.Error())
            http.Error(w,err.Error(),http.StatusInternalServerError)
            return
        }

        client.Set(UUID.String(),u.Username,24*time.Hour)

        err = json.NewEncoder(w).Encode(map[string]interface{}{
            "email": u.Email,
            "username": u.Username,
            "admin":u.Admin,
            "access_token": UUID.String(),
        })
    }
}

func Autolog(w http.ResponseWriter,req *http.Request)  {
    setupResponse(&w,req)
    if req.Method == "OPTIONS" { 
 	    return 
    }
    if req.Method == "POST" {}
    var ut Profile
    var u struct{
        Access_token string
    }

    bs,err := ioutil.ReadAll(req.Body)
    if err != nil {
        log.Println("erreur read")
        http.Error(w,err.Error(),http.StatusInternalServerError)
        return
    }
    err = json.Unmarshal(bs,&u)
    if err != nil {
        log.Println(err.Error())
        http.Error(w,err.Error(),http.StatusInternalServerError)
        return
    }

    client := redis.NewClient(&redis.Options{
        Addr: ":6379",
        Password: "",
        DB: 0,
    })

    p := client.Get(u.Access_token)
    fmt.Println(p)

    if p.Val() != "" {
        
        err = getSession().DB("SSI").C("users").Find(bson.M{"username":p.Val()}).One(&ut)
        if err != nil {
            log.Println("erreur db")
            http.Error(w,err.Error(),http.StatusInternalServerError)
            return
        }
        err = json.NewEncoder(w).Encode(map[string]interface{}{
            "username": ut.Username,
            "email": ut.Email,
            "access_token": u.Access_token,
            "admin":ut.Admin,
        })
        log.Println("success")
    }
}