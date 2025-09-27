export default defineEventHandler(() => {
    return [
        {
            id: 0,
            title: 'Coding Assistant',
            description: 'Ever feel stuck in code? Let’s build a buddy who helps you debug in real-time!',
            body: 'Coding Assistant is an innovative project designed to enhance developers efficiency in writing and executing code. By leveraging large language model, this application provides real-time solutions for debugging and code management in an interactive environment. The main features of this application allow users to communicate with an large language model for programming assistance and execute commands directly through an integrated virtual terminal.',
            github: 'https://github.com/komikodok/coding_assistant-llms',
            link: '',
            image: '/coding-assistant.webp'
        },
        {
            id: 1,
            title: 'TensorFlow ML Projects',
            description: 'Wanna dive into CNNs and LSTMs together? Let’s train some cool models!',
            body: 'This machine learning project contains two separate deep learning implementations using TensorFlow: one for image classification using a Convolutional Neural Network (CNN), and another for natural language processing using a Long Short-Term Memory (LSTM) network. Both models demonstrate how neural networks can be applied to visual and textual data respectively, covering essential steps such as data preprocessing, model training, and evaluation.',
            github: 'https://github.com/komikodok/traditional_machine_learning',
            link: '',
            image: '/tf-ml.webp'
        },
        {
            id: 2,
            title: 'Expressive Assistant',
            description: 'Imagine a chatbot that vibes with your mood. Help me make it more human. Let’s create a chatbot that doesn’t just reply, but actually feels alive.',
            body: 'Expressive Assistant project is an AI-powered chatbot designed to provide a more natural and expressive conversational experience. Beyond simply delivering responses, this bot can adjust its expressions based on the context of the conversation. Powered by advanced LLM (Large Language Model) technology with LangChain-Groq and LangGraph, the chatbot can generate more dynamic and context-aware responses. Built using a combination of FastAPI for backend logic processing and Laravel for handling the UI, Expressive Bot offers an interactive chat experience with an added layer of emotional expression.',
            github: 'https://github.com/komikodok/expressive_bot-llms',
            link: '',
            image: '/expressive-assistant.webp'
        },
        {
            id: 3,
            title: 'Firestore Integration with FastAPI',
            description: 'Wanna build slick APIs with clean data flows and sweet error handling? Let’s do it.',
            body: 'This project demonstrates how to integrate Firestore with FastAPI, featuring custom serialization and structured exception handling. Built with Python 3.10+ to take advantage of match-case syntax, it allows clean error handling and modular response logic. The custom serializer mimics the behavior of Django REST Framework, providing a structured way to define and validate data models for Firestore operations.\n\nKey features include seamless CRUD operations with Firestore, Pythonic error handling using structural pattern matching, and a reusable serialization system for cleaner and more maintainable code.',
            github: 'https://github.com/komikodok/integrate-firestore-fastapi',
            link: '',
            image: '/integrate-firestore-fastapi.webp'
        },
        {
            id: 4,
            title: 'Symp - AI Medical Consultation',
            description: 'What if we build an AI that gives health tips like a helpful friend? Let’s try.',
            body: 'Symp is a health consultation platform powered by AI utilizing RAG (Retrieval-Augmented Generation) technology. Users can receive instant symptom analysis, preliminary medical advice, and soon, document and image-based medical evaluations — all accessible anytime, anywhere.\n\nThis project is built with Nuxt.js for the frontend and API routes, integrated with a Retrieval-Augmented Generation pipeline to enable accurate and context-aware medical responses. The AI model accesses a knowledge base of curated medical documents to generate informed responses.',
            github: 'https://github.com/komikodok/symp-ai',
            link: 'https://chat-symp.vercel.app/',
            image: '/symp-ai.webp'
        }

    ]
})