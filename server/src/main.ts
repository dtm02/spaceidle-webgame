// Http2 is likely a better option here, but the class names all start with Http2, so not quite as readable.
import { Server, IncomingMessage, ServerResponse, createServer, type OutgoingHttpHeaders, type OutgoingHttpHeader } from 'http'
import htmlIndex from './htmlIndex.ts'

const HOST = "127.0.0.1" // must be IP, maybe domains work? idk
const PORT = 3333

const server: Server<typeof IncomingMessage, typeof ServerResponse> 
    = createServer((request: IncomingMessage, response: ServerResponse<IncomingMessage>) => {
        // https://mimesniff.spec.whatwg.org/#mime-type-groups content-type should be a valid mime-type
        const outgoingHeader: OutgoingHttpHeaders = {
            "content-type": 'text/html'
        }
        response.writeHead(200, outgoingHeader)
        response.write(htmlIndex(), (err) => {
            if (!err) {
                console.log("Successfully wrote to stream")
            } else {
                console.error("Error in writing to stream")
            }
        })
        response.end()
    })
server.listen(PORT, HOST) // HOST argument is not necessary, defaults to localhost in that case
