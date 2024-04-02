const dotenv = require('dotenv');
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { ChromaClient, GoogleGenerativeAiEmbeddingFunction } = require('chromadb');
const { google } = require('googleapis');
const csvParser = require('csv-parser');
const fs = require('fs');
const FAISS = require('faiss-node').default;

const genAI = new GoogleGenerativeAI("");


// function createVectorDb() {
//     const data = [];
//     fs.createReadStream('codebasics_faqs.csv')
//         .pipe(csvParser())
//         .on('data', (row) => data.push(row))
//         .on('end', () => {
//             console.log('CSV file successfully processed');
//             //  data to embeddings and then index it with FAISS
//         });
// }


async function createVectorDb() {
    const data = [];
    const embeddings = [];

    // Parse the CSV file
    fs.createReadStream('codebasics_faqs.csv')
        .pipe(csvParser())
        .on('data', async (row) => {
            // Extract the prompt from each row
            const prompt = row['prompt'];
            // Generate embedding for the prompt
            // const result = await genAI.getGenerativeModel({ model: "embedding-001" }).embedContent(prompt);
            const embedding = await embedder.generate(prompt);
            // Push the embedding to the embeddings array
            embeddings.push(embedding);
            // Optionally, you can also store other information related to the prompt
            // For example: data.push({ prompt, embedding });
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            // Convert embeddings array to a 2D tensor for FAISS
            const vectors = FAISS.FloatTensor(embeddings);
            // Build an index for FAISS
            const index = FAISS.indexFlatL2(vectors.shape[1]); // L2 distance index
            index.add(vectors); // Add embeddings to the index
            // Optionally, you can save the index for future use
            FAISS.write_index(index, 'embedding_index.index');
        });
}

// Call the function to start processing the CSV file
createVectorDb();

// function getQaChain() {
//     // This part would involve setting up your retrieval logic based on embeddings and the indexed data
//     // Since the direct translation is not feasible, consider designing a function that suits your needs
// }

// // Main execution
// (async () => {
//     // createVectorDb(); // Uncomment to create the vector DB
//     // const chain = await getQaChain();
//     // console.log(await chain.invoke("Do you provide internship?"));
//     createVectorDb();
// })();