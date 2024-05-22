<template>
  <div class="announcement-form">
    <h1 style="color: #28A745;">Add Announcement</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" v-model="title" id="title" required class="form-control" />
      </div>

      <div class="form-group">
        <label for="eventType">Event Type:</label>
        <select v-model="eventType" id="eventType" required class="form-control">
          <option value="" disabled>Select event type</option>
          <option value="Conference">Conference</option>
          <option value="Meeting">Meeting</option>
          <option value="Workshop">Workshop</option>
          <option value="Webinar">Webinar</option>
          <option value="Event">Event</option>
        </select>
      </div>
      <label>Details</label>
      <textarea v-model="details" style="width: 100%; height: 20%;"></textarea><br>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      eventType: '',
      details: ''
    };
  },

    submitForm() {
      const newAnnouncement = {
        id: Date.now(),
        title: this.title,
        type: this.eventType,
        participate: false,
        comment: []
      };
      this.$emit('announcement-created', newAnnouncement);
      this.title = '';
      this.eventType = '';
      this.details='';
    }
  };

</script>

<style scoped>
.announcement-form {
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  padding: 3%;
  border-radius: 2%;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
select,
input[type="file"] {
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #28A745;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #2cc04f;
}
</style>
