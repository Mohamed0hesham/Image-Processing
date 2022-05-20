import express from 'express'
import path from 'path'
import { promises as fsPromises } from 'fs'
import resizeImage from '../utilities/imageProcessing'
import urlValidation from '../utilities/urlValidation'
import _ from 'lodash'

//creating images router
const images = express.Router()

//getting the absolute path of the thumbImages directroy
const thumbImagePath = path.resolve(__dirname, '../../../thumbImages')

//definging an object that will hold the query entered in request the url
const imageSpecs = {
    name: '', //name of the image
    width: '', //width of the image
    height: '', //height of the image
}

//images main route that contains a middleWare to validate the query of the url
images.get(
    '/',
    urlValidation,
    (req: express.Request, res: express.Response): void => {
        //a variable that holds the request query
        const queiry = req.query

        //setting the new query values to the imageSpecs object
        imageSpecs.name = queiry.name as string
        imageSpecs.width = queiry.width as string
        imageSpecs.height = queiry.height as string

        fsPromises
            .access(
                `./thumbImages/${imageSpecs.name}-${imageSpecs.width}x${imageSpecs.height}.jpg`
            )
            .then(() => {
                console.log('cached image found')
                res.sendFile(
                    `${thumbImagePath}/${imageSpecs.name}-${imageSpecs.width}x${imageSpecs.height}.jpg`
                )
            })
            .catch(() => {
                //accessing the requested image by name to check whether it exists or not
                fsPromises
                    .access(`./images/${imageSpecs.name}.jpg`)
                    .then(async () => {
                        console.log('Image exists, resizing in progress...')

                        //an async function that awaits the image to be processed
                        //by calling the image processing function
                        await resizeImage(imageSpecs)
                        res.sendFile(
                            `${thumbImagePath}/${imageSpecs.name}-${imageSpecs.width}x${imageSpecs.height}.jpg`
                        )
                    })
                    .catch(() => {
                        res.send('this image does not exist!')
                    })
            })
    }
)

export default images
