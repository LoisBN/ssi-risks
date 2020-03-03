package main

type Project struct{
	Name string
	Initiator string 
	Homologation int 
	BesoinSec Form
	ImpactsPotentiels Form
	MenacesPotentiels Form
	ImportancesVuln Form
}

type Form map[string]Question

type Question struct {
	Question string
	Reponse  string
}