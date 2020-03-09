package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
)

var dbBesoinSec = getSession().DB("SSI").C("besoinSec")
var dbImpacts = getSession().DB("SSI").C("impacts")
var dbMenaces = getSession().DB("SSI").C("menaces")
var dbImportanceVuln = getSession().DB("SSI").C("importanceVuln")
var dbProjects = getSession().DB("SSI").C("projects")

func saveFormData(w http.ResponseWriter,req *http.Request)  {
    setupResponse(&w,req)
    if req.Method == "OPTIONS" {
        return
    } else if(req.Method == "POST") {
        params := mux.Vars(req)
        formName := params["name"]

        switch formName {
        case "besoinSec":
            var f map[string]interface{}
            bs,err := ioutil.ReadAll(req.Body)
            if err != nil {
                log.Println(err.Error())
                http.Error(w,err.Error(),http.StatusInternalServerError)
                return
            }
            err = json.Unmarshal(bs,&f)
            if err != nil {
                log.Println(err.Error())
                http.Error(w,err.Error(),http.StatusInternalServerError)
                return
            }
            fmt.Println(f["formName"])
            err = dbBesoinSec.Find(bson.M{"formName":f["formName"]}).One(nil)
            if err != nil {
                err = dbBesoinSec.Insert(&f)
                if err != nil {
                    log.Println(err.Error())
                    http.Error(w,err.Error(),http.StatusInternalServerError)
                    return
                }
            } else {
                err = dbBesoinSec.Update(bson.M{"formName":f["formName"]},f)
            }
            case "impacts":
            var f map[string]interface{}
            bs,err := ioutil.ReadAll(req.Body)
            if err != nil {
                log.Println(err.Error())
                http.Error(w,err.Error(),http.StatusInternalServerError)
                return
            }
            err = json.Unmarshal(bs,&f)
            if err != nil {
                log.Println(err.Error())
                http.Error(w,err.Error(),http.StatusInternalServerError)
                return
            }
            err = dbImpacts.Find(bson.M{"formName":f["formName"]}).One(nil)
            if err != nil {
                err = dbImpacts.Insert(&f)
                if err != nil {
                    log.Println(err.Error())
                    http.Error(w,err.Error(),http.StatusInternalServerError)
                    return
                }
            } else {
                err = dbImpacts.Update(bson.M{"formName":f["formName"]},f)
            }
            case "menaces":
            var f map[string]interface{}
            bs,err := ioutil.ReadAll(req.Body)
            if err != nil {
                log.Println(err.Error())
                http.Error(w,err.Error(),http.StatusInternalServerError)
                return
            }
            err = json.Unmarshal(bs,&f)
            if err != nil {
                log.Println(err.Error())
                http.Error(w,err.Error(),http.StatusInternalServerError)
                return
            }
            err = dbMenaces.Find(bson.M{"formName":f["formName"]}).One(nil)
            if err != nil {
                err = dbMenaces.Insert(&f)
                if err != nil {
                    log.Println(err.Error())
                    http.Error(w,err.Error(),http.StatusInternalServerError)
                    return
                }
            } else {
                err = dbMenaces.Update(bson.M{"formName":f["formName"]},f)
            }
            case "importanceVuln":
            var f map[string]interface{}
            bs,err := ioutil.ReadAll(req.Body)
            if err != nil {
                log.Println(err.Error())
                http.Error(w,err.Error(),http.StatusInternalServerError)
                return
            }
            err = json.Unmarshal(bs,&f)
            if err != nil {
                log.Println(err.Error())
                http.Error(w,err.Error(),http.StatusInternalServerError)
                return
            }
            err = dbImportanceVuln.Find(bson.M{"formName":f["formName"]}).One(nil)
            if err != nil {
                err = dbImportanceVuln.Insert(&f)
                if err != nil {
                    log.Println(err.Error())
                    http.Error(w,err.Error(),http.StatusInternalServerError)
                    return
                }
            } else {
                err = dbImportanceVuln.Update(bson.M{"formName":f["formName"]},f)
            }
        }
    }
}

func fetchFormValue(w http.ResponseWriter,req *http.Request)  {
    setupResponse(&w,req)
    if req.Method == "OPTIONS" {
        return
    } else if req.Method == "GET" {
        params := mux.Vars(req)
        formName := params["name"]
        var f []map[string]interface{}
        switch formName {
        case "besoinSec":
            err := dbBesoinSec.Find(nil).All(&f)
            if err != nil {
                log.Println(err.Error())
                http.Error(w,err.Error(),http.StatusInternalServerError)
                return
            }
            json.NewEncoder(w).Encode(f)
        case "impacts":
            err := dbImpacts.Find(nil).All(&f)
            if err != nil {
                log.Println(err.Error())
                http.Error(w,err.Error(),http.StatusInternalServerError)
                return
            }
            json.NewEncoder(w).Encode(f)
        case "menaces":
            err := dbMenaces.Find(nil).All(&f)
            if err != nil {
                log.Println(err.Error())
                http.Error(w,err.Error(),http.StatusInternalServerError)
                return
            }
            json.NewEncoder(w).Encode(f)
        case "importanceVuln":
            err := dbImportanceVuln.Find(nil).All(&f)
            if err != nil {
                log.Println(err.Error())
                http.Error(w,err.Error(),http.StatusInternalServerError)
                return
            }
            json.NewEncoder(w).Encode(f)
        default:
            json.NewEncoder(w).Encode(map[string]string{
                "message": "error no such form",
            })
        }
    }
}