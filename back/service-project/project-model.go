package main

type Project struct{
	Name string
	Initiator string
	Homologation string
	BesoinSec string
	Impacts string
	Menaces string
	ImportanceVuln string
	DateSave string
	Certified Certif
}

type Form map[string]Question

type Certif struct{
	Certif bool
	Date string
}

type Question struct {
	Question string
	Reponse  string
}