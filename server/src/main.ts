// Http2 is likely a better option here, but the class names all start with Http2, so not quite as readable.
import { Server, IncomingMessage, ServerResponse, createServer, type OutgoingHttpHeaders, type OutgoingHttpHeader } from 'http'
import htmlIndex from './htmlIndex.ts'
import { ACCESS_PORT, HOST_ADDRESS } from '../../shared/globals.ts'
import fs from 'fs'
import { resolve } from 'path'
import { WebSocketServer } from 'ws';

function getFile(atUrl) {
    const FILE_PATH = './client' + atUrl
    console.log(resolve(FILE_PATH))
    const descriptor = fs.readFileSync('./client' + atUrl)
    return descriptor.toString()
}

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', (data, binary) => {
        console.log(data.toString())
    })
});

const server: Server<typeof IncomingMessage, typeof ServerResponse> 
    = createServer((request: IncomingMessage, response: ServerResponse<IncomingMessage>) => {
        // https://mimesniff.spec.whatwg.org/#mime-type-groups content-type should be a valid mime-type
        if (request.url === '/') {
            const outgoingHeader: OutgoingHttpHeaders = {
                "content-type": 'text/html'
            }
            response.writeHead(200, outgoingHeader)
            response.write(htmlIndex(), (err) => {
                if (!err) {
                    console.log("Successfully wrote index.html to stream")
                } else {
                    console.error("Error in writing index.html to stream")
                }
            })
            response.end()
        } else if (request.url.startsWith('/src/')) {
            //console.log(getFile(request.url))
            const outgoingHeader: OutgoingHttpHeaders = {
                "content-type": "text/javascript"
            }
            response.writeHead(200, outgoingHeader)
            response.write(getFile(request.url), (err) => {
                if (!err) {
                    console.log("Successfully sent JS!")
                } else {
                    console.log("Could not send js :(")
                }
            })
            response.end()
        }
    })
server.listen(ACCESS_PORT, HOST_ADDRESS) // HOST argument is not necessary, defaults to localhost in that case