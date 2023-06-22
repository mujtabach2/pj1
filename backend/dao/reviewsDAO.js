// do this by yourself 
import mongodb from "mongodb"

const objectId = mongodb.ObjectID

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if(reviews){
            return
        }
        try{
            reviews = await conn.db(process.env.DOCTORS_NS).collection("reviews")
        }
        catch(e){
            console.error(`Unable to establish a connection handle in ReviewsDAO: ${e}`)
        }
    }
    static async addReview(doctorId, review, user, date){
        try
        {const reviewDoc = {
            name: user.name,
            user_id: user._id,
            date: date,
            text: review,
            doctor_id: objectId(doctorId)
        }
        return await reviews.insertOne(reviewDoc)
    }catch(e){
        console.error(`Unable to post review: ${e}`)
        return {error: e}
    }
    }
    static async updateReview(reviewId, userId, text, date){
        try{
            const updateResponse = await reviews.updateOne(
                {user_id: userId, _id: objectId(reviewId)},
                {$set: {text: text, date: date}}
            )
            return updateResponse
        }catch(e){
            console.error(`Unable to update review: ${e}`)
            return {error: e}
        }
    }
    static async deleteReview(reviewId, userId){
        try{
            const deleteResponse = await reviews.deleteOne({
                _id: objectId(reviewId),
                user_id: userId
            })
            return deleteResponse
        }catch(e){
            console.error(`Unable to delete review: ${e}`)
            return {error: e}
        }
    }

} 
