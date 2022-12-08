<template>

  <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
  <student-table v-bind:students="students" 
  v-on:student-arrived-or-left="studentArrivedOrLeft"
  v-on:delete-student="studentDelete"></student-table>    <!--changed this from deleteStudent to studentDeleted--> 

  <student-message v-bind:student="mostRecentStudent"></student-message>

</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'app',
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  components: {
    NewStudentForm,
    StudentTable,
    StudentMessage
  },
  mounted() {
    // load all students - make request to API
    this.updateStudents()
  },
  methods: {
    updateStudents() {
      this.$student_api.getAllStudents().then( students => {
        this.students = students
      })
    },
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then( () => {
        this.updateStudents()
      })
    },
    studentArrivedOrLeft(student, present) {
      student.present = present // update present value
      this.$student_api.updateStudent(student).then ( () => {
        this.mostRecentStudent = student
        this.updateStudents()
      })
    },
    studentDeleted(student) {                                       // changed this from deleteStudent to studentDeleted 
      this.$student_api.deleteStudent(student.id).then( () => {
        this.updateStudents()
        this.mostRecentStudent = {}     // clear weclome/goodbye message
      })
    }
  }
}

</script>

<style>

@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";

</style>
