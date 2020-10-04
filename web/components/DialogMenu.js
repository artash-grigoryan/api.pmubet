import React, {useState} from 'react';
import {Trans} from "react-i18next";

const DialogMenu = ({race}) => {

    const [dialogStatus, setDialogStatus] = useState('closed')
    const countries = [
        /*
        {
            name: <Trans i18nKey="Angola">Angola</Trans>,
            flag: 'angola',
            url: 'https://pmubet.cm/'
        },
         */
        {
            name: <Trans i18nKey="Cameroun">Cameroun</Trans>,
            flag: 'cameroon',
            url: `https://pmubet.cm/horseracing${race ? `/race/R${race.reunion.number}C${race.number}` : ''}`
        },
        {
            name: <Trans i18nKey="Madagascar">Madagascar</Trans>,
            flag: 'madagascar',
            url: `https://www.bet261.mg/horseracing${race ? `/race/R${race.reunion.number}C${race.number}` : ''}`
        },
        /*
        {
            name: <Trans i18nKey="Centrafrique">Centrafrique</Trans>,
            flag: 'central-african-republic',
            url: 'https://pmubet.cm/'
        },
        {
            name: <Trans i18nKey="Gabon">Gabon</Trans>,
            flag: 'gabon',
            url: 'https://pmubet.cm/'
        },
        {
            name: <Trans i18nKey="Mauritius">Mauritius</Trans>,
            flag: 'mauritius',
            url: 'https://pmubet.cm/'
        },
        {
            name: <Trans i18nKey="Nigeria">Nigeria</Trans>,
            flag: 'nigeria',
            url: 'https://pmubet.cm/'
        },
         */
        {
            name: <Trans i18nKey="Tchad">Tchad</Trans>,
            flag: 'chad',
            url: `https://pariezcash-tchad.com/horseracing${race ? `/race/R${race.reunion.number}C${race.number}` : ''}`
        },
    ]

    return (
        <React.Fragment>
            <a className="nav-link" href="javascript:;" onClick={()=>setDialogStatus('opened')}><Trans i18nKey="Play online">Play online</Trans></a>
            <div id="countries-menu-dialog" className={dialogStatus}>
                <div className="overlay" onClick={() => setDialogStatus('closed')}></div>
                <div className="container">
                    <div className="country-list card">
                        <div className="card-header">
                            <h3><Trans i18nKey="Select your country">Select your country</Trans></h3>
                        </div>
                        <div className="card-body">
                            <ul>
                                { countries.map((country, key) => (
                                    <li key={key}>
                                        <a target="_blank" href={country.url}>
                                            <img src={require('./../assets/images/flags/'+country.flag+'.png')} alt={country.name}/>
                                            <span>{country.name}</span>
                                        </a>
                                    </li>
                                )) }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DialogMenu;
