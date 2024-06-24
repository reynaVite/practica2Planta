/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next')
const sprintf = require('i18next-sprintf-postprocessor')



const plantFacts = {
    en: [
        "Plants can communicate with each other through chemical signals.",
        "Some plants mimic the shape or smell of other plants or insects to attract specific pollinators or avoid being eaten.",
        "The oldest known plant is a Bristlecone pine in California, USA, which is over 5,000 years old.",
        "Plants not only produce oxygen during photosynthesis but can also absorb air pollutants.",
        "Plants can communicate through their root systems by sending chemical and electrical signals.",
        "Some plants, like cacti, are adapted to survive in arid environments by storing water in their tissues.",
        "Plants can show rapid responses to stimuli, such as the folding leaves of Mimosa pudica when touched.",
        "Mycorrhizae are symbiotic associations between fungi and plant roots that enhance nutrient and water absorption."
    ],
    es: [
        "Las plantas pueden comunicarse entre sí a través de señales químicas.",
        "Algunas plantas imitan la forma o el olor de otras plantas o insectos para atraer polinizadores específicos o evitar ser comidas.",
        "La planta más antigua conocida es un pino Bristlecone en California, EE.UU., que tiene más de 5,000 años de edad.",
        "Las plantas no solo producen oxígeno durante la fotosíntesis, sino que también pueden absorber contaminantes del aire.",
        "Las plantas pueden comunicarse a través de sus sistemas de raíces, enviando señales químicas y eléctricas.",
        "Algunas plantas, como los cactus, están adaptadas para sobrevivir en entornos áridos acumulando agua en sus tejidos.",
        "Las plantas pueden mostrar respuestas rápidas a estímulos, como las hojas de Mimosa pudica que se pliegan al tocarlas.",
        "Las micorrizas son asociaciones simbióticas entre hongos y raíces de plantas que mejoran la absorción de nutrientes y agua."
    ]
};

const languageStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: 'Welcome Vite! Ask me for a plant fact.',
            FACT_MESSAGE: 'Vite, here is your plant fact: %s',
            HELP_MESSAGE: 'Vite, you can ask me for a plant fact.',
            GOODBYE_MESSAGE: 'Goodbye Vite!',
            FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again Vite.',
            ERROR_MESSAGE: 'Sorry, there was an error. Please try again Vite.',
            PLANT_FACTS: plantFacts.en
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: '¡Bienvenida Vite! Pídeme un dato curioso sobre las plantas.',
            FACT_MESSAGE: 'Vite, aquí tienes un dato curioso sobre las plantas: %s',
            HELP_MESSAGE: 'Vite, puedes pedirme un dato curioso sobre las plantas.',
            GOODBYE_MESSAGE: '¡Adiós Vite!',
            FALLBACK_MESSAGE: 'Lo siento, no sé sobre eso. Por favor intenta de nuevo Vite.',
            ERROR_MESSAGE: 'Lo siento, ha ocurrido un error. Por favor intenta de nuevo Vite.',
            PLANT_FACTS: plantFacts.es
        }
    }
};

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            fallbackLng: 'en',
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.t(...args);
        };
    }
};



 

const PlantFactIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlantFactIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const facts = requestAttributes.t('PLANT_FACTS');
        const factIndex = Math.floor(Math.random() * facts.length);
        const randomFact = facts[factIndex];
        const speakOutput = requestAttributes.t('FACT_MESSAGE', randomFact);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};


 

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
        
        //const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

 

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const facts = requestAttributes.t('PLANT_FACTS');
        const factIndex = Math.floor(Math.random() * facts.length);
        const randomFact = facts[factIndex];
        const speakOutput = requestAttributes.t('FACT_MESSAGE', randomFact);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};



const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
                const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

 


/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        PlantFactIntentHandler,  // Añadir aquí
        IntentReflectorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
