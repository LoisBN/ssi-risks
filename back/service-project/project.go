package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"time"
	"net/http"

	"github.com/go-redis/redis"
	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2/bson"
)

func NewProject(w http.ResponseWriter,req *http.Request) {
	setupResponse(&w,req)
	if req.Method == "OPTIONS" {
		return
	}
	if req.Method == "POST" {
		
		var u Project
		bs,err := ioutil.ReadAll(req.Body)
		if err != nil {
			fmt.Println(err.Error())
			http.Error(w,err.Error(),http.StatusInternalServerError)
			return
		}
		err = json.Unmarshal(bs,&u)
		if err != nil {
			fmt.Println(err.Error())
			http.Error(w,err.Error(),http.StatusInternalServerError)
			return
		}
		client := redis.NewClient(&redis.Options{
			Addr: "redis:6379",
			Password: "",
			DB: 1,
		})
		fmt.Println(u)
		x := client.HGet(u.Name,"name")
		if x.Val() != "" {
			return
		}
		////x := `{"`+u.Name+`":"`+u.Initiator+`"}`
		client.HSet(u.Name,"name",u.Name)
		client.HSet(u.Name,"initiator",u.Initiator)
		client.HSet(u.Name,"homologation",0)
		client.HSet(u.Name,"besoinSec",0)
		client.HSet(u.Name,"menaces",0)
		client.HSet(u.Name,"impacts",0)
		client.HSet(u.Name,"importanceVuln",0)
	}
}

func GetAll(w http.ResponseWriter,req *http.Request) {
	setupResponse(&w,req)
	if req.Method == "OPTIONS" {
		return
	}
	if req.Method == "GET" {
		params := mux.Vars(req)
		user := params["name"]
		client := redis.NewClient(&redis.Options{
			Addr: "redis:6379",
			Password: "",
			DB: 1,
		})
		var p = make(map[string]interface{})
		for _,key := range client.Keys("*").Val() {
			x := client.HGet(key,"initiator")
			if x.Val() == user {
				p[key] = client.HGetAll(key).Val()
			}
		}

		fmt.Println(p)
		json.NewEncoder(w).Encode(&p)
	}
}

func GetProject(w http.ResponseWriter,req *http.Request)  {
	setupResponse(&w,req)
	if req.Method == "OPTIONS" {
		return
	}
	if req.Method == "GET" {
		params := mux.Vars(req)
		name := params["name"]

		client := redis.NewClient(&redis.Options{
			Addr: ":6379",
			Password: "",
			DB: 1,
		})
		var p = make(map[string]interface{})
		var s interface{}
		var t interface{}
		var u interface{}
		var v interface{}
		for _,key := range client.Keys(name).Val() {
			//p[key] = client.HGetAll(key).Val()
			err := getSession().DB("SSI").C("besoinSec").Find(bson.M{"projectName":key}).All(&s)
			if err != nil {
				log.Println(err.Error())
				http.Error(w,err.Error(),http.StatusInternalServerError)
				return
			}
			err = getSession().DB("SSI").C("besoinSec").Find(bson.M{"projectName":key}).All(&s)
			if err != nil {
				log.Println(err.Error())
				http.Error(w,err.Error(),http.StatusInternalServerError)
				return
			}
			err = getSession().DB("SSI").C("besoinSec").Find(bson.M{"projectName":key}).All(&s)
			if err != nil {
				log.Println(err.Error())
				http.Error(w,err.Error(),http.StatusInternalServerError)
				return
			}
			err = getSession().DB("SSI").C("besoinSec").Find(bson.M{"projectName":key}).All(&s)
			if err != nil {
				log.Println(err.Error())
				http.Error(w,err.Error(),http.StatusInternalServerError)
				return
			}
			p["besoinSec"]=s
			p["besoinSec"]=t
			p["besoinSec"]=u
			p["besoinSec"]=v
		}
		fmt.Println(p)
		json.NewEncoder(w).Encode(&p)
	}
}

func UpdateProject(w http.ResponseWriter,req *http.Request)  {
	setupResponse(&w,req)
	if req.Method == "OPTIONS" {
		return
	}
	if req.Method == "PUT" || req.Method == "PATCH" {
		params := mux.Vars(req)
		name := params["name"]

		client := redis.NewClient(&redis.Options{
			Addr: "redis:6379",
			Password: "",
			DB: 1,
		})
		
		if client.Get(name) != nil {

		var u Project
		bs,err := ioutil.ReadAll(req.Body)
		if err != nil {
			fmt.Println(err.Error())
			return
		}
		err = json.Unmarshal(bs,&u)
		if err != nil {
			fmt.Println(err.Error())
			return
		}
		if client.HGet(name,"name").Val() == u.Name {
			return
		}
		if err = getSession().DB("SSI").C("projects").Find(bson.M{"name":u.Name}).One(nil);err != nil {
			return
		}
		client.HSet(name,"initiator",u.Initiator)
		client.HSet(name,"name",u.Name)
		}
	}
}

func Certified(w http.ResponseWriter,req *http.Request) {
	setupResponse(&w,req)
	if req.Method == "OPTIONS" {
		return
	} else {
		params := mux.Vars(req)
		name := params["name"]
		paris,_ := time.LoadLocation("Europe/Paris")
		_ = getSession().DB("SSI").C("projects").Update(bson.M{"name":name},bson.M{"$set" : bson.M{"certified":bson.M{"certif":true,"date": time.Now().In(paris).Format("2 Jan 2006 15:04:05")}}})
	}
}

func DeleteProject(w http.ResponseWriter,req *http.Request)  {
	setupResponse(&w,req)
	if req.Method == "OPTIONS" {
		return
	}
	params := mux.Vars(req)
	name := params["name"]

	client := redis.NewClient(&redis.Options{
		Addr: "redis:6379",
		Password: "",
		DB: 1,
	})

	client.Del(name)

	
}

func SaveProject(w http.ResponseWriter,req *http.Request) {
	setupResponse(&w,req)
	if req.Method == "OPTIONS" {
		return
	} else if req.Method == "POST" {
		params := mux.Vars(req)
		name := params["name"]

		client := redis.NewClient(&redis.Options{
			Addr: "redis:6379",
			Password: "",
			DB: 1,
		})

		project := client.HGetAll(name)
		if project.Val()["name"] == "" {
			log.Println("this project does not exist")
			http.Error(w,"this project does not exist",http.StatusNotFound)
			err := getSession().DB("SSI").C("projects").Remove(bson.M{"name":name})
			if err != nil {
				log.Println(err.Error())
				return
			}
			return
		}
		paris,_ := time.LoadLocation("Europe/Paris")
		p := Project{
			Name: project.Val()["name"],
			Initiator: project.Val()["initiator"],
			Homologation : project.Val()["homologation"],
			BesoinSec : project.Val()["besoinSec"],
			Menaces : project.Val()["menaces"],
			Impacts : project.Val()["impacts"],
			ImportanceVuln : project.Val()["importanceVuln"],
			DateSave : time.Now().In(paris).Format("2 Jan 2006 15:04:05"),
		}
		var f Project
		err := getSession().DB("SSI").C("projects").Find(bson.M{"name":p.Name}).One(&f)
		if err != nil {
			log.Println("erreur")
			err = getSession().DB("SSI").C("projects").Insert(&p)
			if err != nil {
				log.Println(err.Error())
				return
			}
		} else if f.Name == "" {
			err = getSession().DB("SSI").C("projects").Insert(&p)
			if err != nil {
				log.Println(err.Error())
				return
			}
		} else {
			err = getSession().DB("SSI").C("projects").Update(bson.M{"name":p.Name},&p)
			if err != nil {
				log.Println(err.Error())
				return
			}
		}
	}
}

func GetAllFromDB(w http.ResponseWriter,req *http.Request)  {
	setupResponse(&w,req)
	if req.Method == "OPTIONS" {
		return
	} else if req.Method == "GET" {
		var f []interface{}
		err := getSession().DB("SSI").C("projects").Find(nil).All(&f)
		if err != nil {
			log.Println(err.Error())
			http.Error(w,err.Error(),http.StatusNotFound)
			return
		}
		fmt.Println(f)
		json.NewEncoder(w).Encode(f)
	}
}