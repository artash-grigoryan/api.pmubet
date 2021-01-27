import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import Looks5OutlinedIcon from '@material-ui/icons/Looks5Outlined';
import {HelpRounded} from "@material-ui/icons";
import BottomNavigationContext from "./contexts/BottomNavigationContext";
import BetButtonBottomNavigation from "./BetButtonBottomNavigation";
import Q5Icon from "./Q5Icon";
import {Trans} from "react-i18next";

const useStyles = makeStyles({

});

export default function SimpleBottomNavigation(props) {
    const classes = useStyles();
    const {value, setValue} = useContext(BottomNavigationContext)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const test = (link) => {
        window.location.href = link;
    }

    return (
        <BottomNavigation value={value} onChange={handleChange} showLabels={true} >
            <BottomNavigationAction component={Link} to={"/"+props.lang} label={<Trans i18nKey="Programs">Programs</Trans>} icon={<RestoreIcon />} />
            {props.nextQ5
                ?
                <BottomNavigationAction
                                        onClick={() => test("/" + props.lang + "/" + props.nextQ5.datePath + "/R" + props.nextQ5.reunion.number + "/C" + props.nextQ5.number)}
                                        label="Quinté +"
                                        icon={<Looks5OutlinedIcon/>}/>
                :
                props.race
                    ?
                    <BottomNavigationAction component={Link}
                                            to={"/" + props.lang + "/" + props.race.datePath + "/R" + props.race.reunion.number + "/C" + props.race.number}
                                            label="Quinté +"
                                            icon={<Looks5OutlinedIcon/>}/>
                    :
                    <BottomNavigationAction component={Link} to={"#"} label="Quinté +" icon={<Looks5OutlinedIcon/>}/>}
            }
            <BottomNavigationAction component={Link} to={"/"+props.lang+"/comment-jouer"} label={<Trans i18nKey="Help">Help</Trans>} icon={<HelpRounded />} />
            <BetButtonBottomNavigation race={props.race} />
        </BottomNavigation>
    );
}