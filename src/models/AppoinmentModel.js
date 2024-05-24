const { model, Schema } = require("mongoose");

const appoinmentSchema = new Schema({
  patientId: String,
  doctorId: String,
  appoinmentDate: String,
  trackNumber: String,
  serialNumber: Number,
  age: Number,
  nid_Number: {
    type: String,
  },
  ticket: {
    price: Number,
    isPaid: Boolean,
  },

  isMarried: Boolean,
  doctorRoomNumber: Number,
  contactNumber: String,
  tests: [
    {
      name: String,
      price: Number,
      isPaid: Boolean,
      date: String,
      serial: Number,
      status: {
        type: String,
        enum: ["Processing", "Pending", "Done"],
      },
      entryOnPayment: {
        name: String,
        date: String,
        workerId: String,
      },
      sampleOnCollect: {
        name: String,
        date: String,
        workerId: String,
      },
      labTester: {
        name: String,
        date: String,
        workerId: String,
      },
      delivery: {
        name: String,
        date: String,
        workerId: String,
      },
      reports: [
        {
          name: String, // Liver, Kidne
          result: [
            {
              key: String,
              value: String,
            },
          ],
        },
      ],
    },
  ],
  madicine: [
    {
      name: String,
      day: Number,
      status: {
        type: String,
        enum: ["On", "Off", "Continue"],
      },
      schedule: {
        morning: Boolean,
        lunch: Boolean,
        night: Boolean,
      },
      date: String,
    },
  ],
});

const Appoinment = model("Model", appoinmentSchema);
module.exports = Appoinment;
