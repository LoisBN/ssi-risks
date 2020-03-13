import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import {fetchAnswer} from "../../../redux/actions"

const Recap = props => {
    
    const [ current, setCurrent ] = useState( "besoin sécurité" )
    const [ filter, setFilter ] = useState( '' );
    useEffect( () => {
        console.log(props)
        if ( typeof props.formName == typeof {} ) {
            props.fetchAnswer(current,props.formName.name)
        }
    }, [ props.formName ,current] );
    return (
    <div className={props.displayPanel === true ? 'modal fadeInScale is-active' : 'modal fadeInScale'}>
        <div className="modal-background" onClick={props.quit}></div>
            <div className="modal-content" onClick={ e => e.stopPropagation() }>
                
                <div className="container">
            <nav className="panel has-background-white">
                <p className="panel-heading">
                    Synthèse partie {current}
                </p>
                <div className="panel-block">
                    <p className="control has-icons-left">
                    <input onChange={e => setFilter(e.target.value)} value={filter} className="input" type="text" placeholder="Search" />
                    <span className="icon is-left">
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                    </p>
                </div>
                <p className="panel-tabs">
                    <a style={{textAlign:"center"}} onClick={()=> setCurrent('besoin sécurité')} className={current === "besoin sécurité"? "is-active":"" }>Besoin en sécurité</a>
                    <a style={{textAlign:"center"}} onClick={()=> setCurrent('impacts potentiels')} className={current === "impacts potentiels"? "is-active":"" }>Impacts potentiels sur le SI</a>
                    <a style={{textAlign:"center"}} onClick={()=> setCurrent('menaces potentielles')} className={current === "menaces potentielles"? "is-active":"" }>Menaces potentielles sur le SI</a>
                    <a style={{textAlign:"center"}} onClick={()=> setCurrent('importances des vulnérabilités')} className={current === "importances des vulnérabilités"? "is-active":"" }> Importances des vulnérabilités</a>
                </p>
                        { Object.keys( props.answer ).map( ( value ) => {
                            if (typeof props.answer[value] === typeof {} && value.toLowerCase().includes( filter.toLowerCase() )) {
                                return (
                                    <a className="panel-block">
                                        <span className="panel-icon">
                                        <i className="fas fa-code-branch" aria-hidden="true"></i>
                                        </span>
                                        question : {value} <br />
                                        réponses : {Object.values( props.answer[ value ] ).join (" - ") }
                                    </a>
                                )
                            }
                            if ( value.toLowerCase().includes( filter.toLowerCase() ) ) {
                                return (
                                    <a className="panel-block">
                                        <span className="panel-icon">
                                            <i className="fas fa-code-branch" aria-hidden="true"></i>
                                        </span>
                                    question : {value } <br />
                                    réponse : {props.answer[ value ] }
                                    </a>
                                );
                            } 
                })}                
                <div className="panel-block">
                    <button onClick={()=>setFilter('')} className="button is-link is-outlined is-fullwidth">
                    Reset all filters
                    </button>
                </div>
                    </nav>
                    </div>
            </div>
        
        <button className="modal-close is-large" aria-label="close" onClick={props.quit}></button>
    </div>
    );
}

const mapStateToProps = state => {
    return {
        answer: state.answer
    }
}

export default connect(mapStateToProps,{fetchAnswer})(Recap);