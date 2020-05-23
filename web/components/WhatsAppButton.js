import React from 'react'

const WhatsAppButton = () => {

    const whatsappRedirect = () => {}

    return (
        <div id="whatsapp-button">
            <button onClick={() => whatsappRedirect()}>
                <img src={require('../assets/images/icons/WhatsApp.svg')} alt=""/>
            </button>
        </div>
    );
}

export default WhatsAppButton;