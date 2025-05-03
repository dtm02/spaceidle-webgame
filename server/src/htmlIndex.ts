// Separating the necessary page logic from the write makes sense to me, because I know I'll need to do calculations before writing later, but I'm not sure if this is the best practice.
import ejs from 'ejs'
import fs from 'fs'

// @return index.html as string
function htmlIndex() {
     // '.' resolves to "spacetrek-webgame/" for some reason. 
     // TODO: Find out why it resolves to that instead of this directory
    const TEMPLATE_PATH = './server/templates/index.ejs'
    const params = { location: 'World' }

    const indexTemplate = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
    const compiledIndex = ejs.compile(indexTemplate);
    return compiledIndex(params)
}

export default htmlIndex