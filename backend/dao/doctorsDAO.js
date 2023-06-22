let doctors;

export default class DoctorsDAO {
  static async injectDB(conn) {
    if (doctors) {
      return;
    }
    try {
      doctors = await conn.db(process.env.DOCTORS_NS).collection("doctors");
    } catch (e) {
      console.error(`Unable to establish a connection handle in DoctorsDAO: ${e}`);
    }
  }

  static async getDoctors({
    filters = null,
    page = 0,
    doctorsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("city" in filters) {
        query = { "city": { $eq: filters["city"] } };
      }
       if ("type" in filters) {
        query = { "type": { $eq: filters["type"] } };
      }
    }

    let cursor;
    try {
      cursor = await doctors.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { doctorsList: [], totalNumDoctors: 0 };
    }

    const displayCursor = cursor.limit(doctorsPerPage).skip(doctorsPerPage * page);

    try{
      const doctorsList = await displayCursor.toArray();
      const totalNumDoctors = await doctors.countDocuments(query);

      return { doctorsList, totalNumDoctors };
    }
    catch(e){
      console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
      return { doctorsList: [], totalNumDoctors: 0 };
    }

  }

  static async getDoctorByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
      ];
      return await doctors.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getDoctorByID: ${e}`);
      throw e;
    } 
  }

  static async getDoctorByCity(city) {
    try {
      const pipeline = [
        {
          $match: {
            city: city,
          },
        },
      ];
      return await doctors.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getDoctorByCity: ${e}`);
      throw e;
    }
  }

  static async getDoctorByType(type) {
    try{
      const pipeline = [
        {
          $match: {
            type: type,
          },
        },
      ];
      return await doctors.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getDoctorByType: ${e}`);
      throw e;
        }
      
    }
    static async getDoctorByName(name) {
      try{
        const pipeline = [
          {
            $match: {
              name: name,
            },
          },
        ];
        return await doctors.aggregate(pipeline).next();
      } catch (e) {
        console.error(`Something went wrong in getDoctorByName: ${e}`);
        throw e;
          }
        
        }
    }

