package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/go-redis/redis"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
)

var dbForm = getSession().DB("SSI").C("form")
var dbBesoinSec = getSession().DB("SSI").C("besoinSec")
var dbMenaces = getSession().DB("SSI").C("menaces")
var dbImpacts = getSession().DB("SSI").C("impacts")
var dbImportanceVuln = getSession().DB("SSI").C("importanceVuln")
var dbProjects = getSession().DB("SSI").C("projects")

func establishSynthesisAll(w http.ResponseWriter,req *http.Request)  {
    setupResponse(&w,req)
    if req.Method == "OPTIONS" {
        return
    } else if req.Method == "POST" {
        params := mux.Vars(req)
        formName := params["formName"]
        var f []map[string]interface{}
        switch formName {
        case "besoinSec":
            err := dbBesoinSec.Find(nil).All(&f)
            if err != nil {
                log.Println(err.Error())
                return
            }
            for _,val := range f {
                err := dbProjects.Update(bson.M{"name":val["name"]},bson.M{"name":val["name"],"questions":f})
                if err != nil {
                    log.Println("this projects does not exist")
                    http.Error(w,err.Error(),http.StatusInternalServerError)
                    continue
                }
            }
        case "menaces":
            err := dbMenaces.Find(nil).All(&f)
            if err != nil {
                log.Println(err.Error())
                return
            }
            for _,val := range f {
                err := dbProjects.Update(bson.M{"name":val["name"]},bson.M{"name":val["name"],"questions":f})
                if err != nil {
                    log.Println("this projects does not exist")
                    http.Error(w,err.Error(),http.StatusInternalServerError)
                    continue
                }
            }
        case "impacts":
            err := dbImpacts.Find(nil).All(&f)
            if err != nil {
                log.Println(err.Error())
                return
            }
            for _,val := range f {
                err := dbProjects.Update(bson.M{"name":val["name"]},bson.M{"name":val["name"],"questions":f})
                if err != nil {
                    log.Println("this projects does not exist")
                    http.Error(w,err.Error(),http.StatusInternalServerError)
                    continue
                }
            }
        case "importanceVuln":
            err := dbImportanceVuln.Find(nil).All(&f)
            if err != nil {
                log.Println(err.Error())
                return
            }
            for _,val := range f {
                err := dbProjects.Update(bson.M{"name":val["name"]},bson.M{"name":val["name"],"questions":f})
                if err != nil {
                    log.Println("this projects does not exist")
                    http.Error(w,err.Error(),http.StatusInternalServerError)
                    continue
                }
            }
        }
    }
}

func updateProject(w http.ResponseWriter,req *http.Request) {
    setupResponse(&w,req)
    if req.Method == "OPTIONS" {
        return
    } else if req.Method == "POST" || req.Method == "PUT" || req.Method == "PATCH" || req.Method == "GET" {
        params := mux.Vars(req)
        fieldName := params["field"]
        projectName := params["name"]
        var f map[string]map[string]interface{}
        switch fieldName {
        case "besoinSec":
            err := dbBesoinSec.Find(bson.M{"formName":projectName}).One(&f)
            if err != nil {
                log.Println(err.Error())
                return
            }
            fmt.Println(f)
            
            var x int
            iterator : for field,val := range f {
                if field == "_id" || field == "formName" || field == "initiator" {
                    goto iterator
                } else {
                    if _,ok := val["quotation"];ok {
                        y,err := strconv.Atoi(val["quotation"].(string))
                        if err != nil {
                            log.Println(err.Error())
                            return
                        }
                        x+=y
                    } else {
                        for _,val2 := range val {
                            y,err := strconv.Atoi(val2.(map[string]interface{})["quotation"].(string))
                            if err != nil {
                                log.Println(err.Error())
                                return
                            }
                            x+=y
                        }
                    }
                }
            }
            fmt.Println(x)
            client := redis.NewClient(&redis.Options{
                Addr: "redis:6379",
                Password: "",
                DB: 1,
            })
            client.HSet(projectName,"besoinSec",x)

        case "menaces":
            err := dbMenaces.Find(bson.M{"formName":projectName}).One(&f)
            if err != nil {
                log.Println(err.Error())
                return
            }
            fmt.Println(f)
            
            var x int
            iterator1 : for field,val := range f {
                if field == "_id" || field == "formName" || field == "initiator" {
                    goto iterator1
                } else {
                    if _,ok := val["quotation"];ok {
                        y,err := strconv.Atoi(val["quotation"].(string))
                        if err != nil {
                            log.Println(err.Error())
                            return
                        }
                        x+=y
                    } else {
                        for _,val2 := range val {
                            y,err := strconv.Atoi(val2.(map[string]interface{})["quotation"].(string))
                            if err != nil {
                                log.Println(err.Error())
                                return
                            }
                            x+=y
                        }
                    }
                }
            }
            fmt.Println(x)
            client := redis.NewClient(&redis.Options{
                Addr: "redis:6379",
                Password: "",
                DB: 1,
            })
            client.HSet(projectName,"menaces",x)
        case "impacts":
            err := dbImpacts.Find(bson.M{"formName":projectName}).One(&f)
            if err != nil {
                log.Println(err.Error())
                return
            }
            fmt.Println(f)
            
            var x int
            iterator2 : for field,val := range f {
                if field == "_id" || field == "formName" || field == "initiator" {
                    goto iterator2
                } else {
                    if _,ok := val["quotation"];ok {
                        y,err := strconv.Atoi(val["quotation"].(string))
                        if err != nil {
                            log.Println(err.Error())
                            return
                        }
                        x+=y
                    } else {
                        for _,val2 := range val {
                            y,err := strconv.Atoi(val2.(map[string]interface{})["quotation"].(string))
                            if err != nil {
                                log.Println(err.Error())
                                return
                            }
                            x+=y
                        }
                    }
                }
            }
            fmt.Println(x)
            client := redis.NewClient(&redis.Options{
                Addr: "redis:6379",
                Password: "",
                DB: 1,
            })
            client.HSet(projectName,"impacts",x)
        case "importanceVuln":
            err := dbImportanceVuln.Find(bson.M{"formName":projectName}).One(&f)
            if err != nil {
                log.Println(err.Error())
                return
            }
            fmt.Println(f)
            
            var x int
            iterator3 : for field,val := range f {
                if field == "_id" || field == "formName" || field == "initiator" {
                    goto iterator3
                } else {
                    if _,ok := val["quotation"];ok {
                        y,err := strconv.Atoi(val["quotation"].(string))
                        if err != nil {
                            log.Println(err.Error())
                            return
                        }
                        x+=y
                    } else {
                        for _,val2 := range val {
                            y,err := strconv.Atoi(val2.(map[string]interface{})["quotation"].(string))
                            if err != nil {
                                log.Println(err.Error())
                                return
                            }
                            x+=y
                        }
                    }
                }
            }
            fmt.Println(x)
            client := redis.NewClient(&redis.Options{
                Addr: "redis:6379",
                Password: "",
                DB: 1,
            })
            client.HSet(projectName,"importanceVuln",x)
        }
        client := redis.NewClient(&redis.Options{
            Addr: "redis:6379",
            Password: "",
            DB: 1,
        })
        x,err := strconv.Atoi(client.HGet(projectName,"besoinSec").Val())
        if err != nil {
            log.Println(err.Error())
            return
        }
        y,err := strconv.Atoi(client.HGet(projectName,"menaces").Val())
        if err != nil {
            log.Println(err.Error())
            return
        }
        z,err := strconv.Atoi(client.HGet(projectName,"impacts").Val())
        if err != nil {
            log.Println(err.Error())
            return
        }
        w,err := strconv.Atoi(client.HGet(projectName,"importanceVuln").Val())
        if err != nil {
            log.Println(err.Error())
            return
        }

        h := calculateHomologation(x,y,z,w)
        fmt.Println(h)
        client.HSet(projectName,"homologation",h)
    } 
}

func calculateHomologation(fieldsVal ...int) int {
    var x int
    for _,val := range fieldsVal {
        x+=val
    }
    return x
}

func GetAnswer(w http.ResponseWriter,req *http.Request) {
    setupResponse(&w,req)
    if req.Method == "OPTIONS" {
        return 
    } else {
        params := mux.Vars(req)
        projectName := params["name"]
        fieldName := params["field"]
        log.Println(projectName)
        var f map[string]interface{}
        var x  = make(map[string]interface{})
        switch fieldName {
        case "besoinSec":
            err := dbBesoinSec.Find(bson.M{"formName":projectName}).One(&f)
            if err != nil {
                log.Println(err.Error())
                json.NewEncoder(w).Encode(map[string]string{
                    "error":"no entry for this",
                })
                return
            }
            log.Println(f)
            
            for index,val := range f {
                log.Println(index)
                if index == "_id" || index == "formName" || index == "initiator" {
                    log.Println("here")
                    continue
                } else {
                    if _,ok := val.(map[string]interface{})["answer"];ok {
                        x[index] = val.(map[string]interface{})["answer"]
                    } else {
                        var y = make(map[string]string)
                        for i,v := range val.(map[string]interface{}) {
                            y[i] = v.(map[string]interface{})["answer"].(string)
                        }
                        x[index] = y
                    }
                }
            }
            log.Println("here")
            err = json.NewEncoder(w).Encode(x)
            if err != nil {
                log.Println(err.Error())
                return
            }
        case "impacts":
            err := dbImpacts.Find(bson.M{"formName":projectName}).One(&f)
            if err != nil {
                log.Println(err.Error())
                json.NewEncoder(w).Encode(map[string]string{
                    "error":"no entry for this",
                })
                return
            }
            for index,val := range f {
                log.Println(index)
                if index == "_id" || index == "formName" || index == "initiator" {
                    log.Println("here")
                    continue
                } else {
                    if _,ok := val.(map[string]interface{})["answer"];ok {
                        x[index] = val.(map[string]interface{})["answer"]
                    } else {
                        var y = make(map[string]string)
                        for i,v := range val.(map[string]interface{}) {
                            y[i] = v.(map[string]interface{})["answer"].(string)
                        }
                        x[index] = y
                    }
                }
            }
            err = json.NewEncoder(w).Encode(&x)
            if err != nil {
                log.Println(err.Error())
                return
            }
        case "menaces":
            err := dbMenaces.Find(bson.M{"formName":projectName}).One(&f)
            if err != nil {
                log.Println(err.Error())
                json.NewEncoder(w).Encode(map[string]string{
                    "error":"no entry for this",
                })
                return
            }
            for index,val := range f {
                log.Println(index)
                if index == "_id" || index == "formName" || index == "initiator" {
                    log.Println("here")
                    continue
                } else {
                    if _,ok := val.(map[string]interface{})["answer"];ok {
                        x[index] = val.(map[string]interface{})["answer"]
                    } else {
                        var y = make(map[string]string)
                        for i,v := range val.(map[string]interface{}) {
                            y[i] = v.(map[string]interface{})["answer"].(string)
                        }
                        x[index] = y
                    }
                }
            }
            err = json.NewEncoder(w).Encode(&x)
            if err != nil {
                log.Println(err.Error())
                return
            }
        case "importanceVuln":
            err := dbImportanceVuln.Find(bson.M{"formName":projectName}).One(&f)
            if err != nil {
                log.Println(err.Error())
                json.NewEncoder(w).Encode(map[string]string{
                    "error":"no entry for this",
                })
                return
            }
            for index,val := range f {
                log.Println(index)
                if index == "_id" || index == "formName" || index == "initiator" {
                    log.Println("here")
                    continue
                } else {
                    if _,ok := val.(map[string]interface{})["answer"];ok {
                        x[index] = val.(map[string]interface{})["answer"]
                    } else {
                        var y = make(map[string]string)
                        for i,v := range val.(map[string]interface{}) {
                            y[i] = v.(map[string]interface{})["answer"].(string)
                        }
                        x[index] = y
                    }
                }
            }
            err = json.NewEncoder(w).Encode(&x)
            if err != nil {
                log.Println(err.Error())
                return
            }
        }
    }
}