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
  { collection: 'msc_course', timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
