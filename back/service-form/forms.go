package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
)

var db = getSession().DB("SSI").C("form")
func Test(w http.ResponseWriter,req *http.Request)  {
    fmt.Fprintln(w,"hello test")
}
func BesoinSecForm(w http.ResponseWriter,req *http.Request)  {
    setupResponse(&w,req)
    switch req.Method {
    case "OPTIONS":
        return
    case "POST":
        var f Form
        var i Form
        bs,err := ioutil.ReadAll(req.Body)
        if err != nil {
            log.Println(err.Error())
            http.Error(w,err.Error(),http.StatusInternalServerError)
            return
        }
        err = json.Unmarshal(bs,&f)
        fmt.Println(f)
        err = db.Find(bson.M{"name":"besoin_sécurité"}).One(&i)
        if err != nil {
            err = db.Insert(&f)
        } else {
            err = db.Update(bson.M{"name":"besoin_sécurité"},f)
            if err != nil {
                log.Println(err.Error())
                http.Error(w,err.Error(),http.StatusInternalServerError)
                return
            }
        }
    case "GET":
        var f Form
        err := db.Find(bson.M{"name":"besoin_sécurité"}).One(&f)
        if err != nil {
            log.Println(err.Error())
            http.Error(w,"from here"+err.Error(),http.StatusInternalServerError)
            return
        }
        fmt.Println(f)
        err = json.NewEncoder(w).Encode(&f)
    default:
        fmt.Fprintln(w,"you out")
    }
}