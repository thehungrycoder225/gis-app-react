import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    school: {
      type: String,
    },
    course: {
      type: String,
    },
  },
  { timestamps: true },
  { collection: 'msc_course' }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
