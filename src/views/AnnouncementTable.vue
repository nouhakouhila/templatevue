<template>
  <div class="announcement-table" style="float: left;">
    <h2 style="color: white;">Announcements</h2>
    <router-link to="/addannouncement">
      <div class="add_button"><i class="fa-solid fa-plus"></i> Add announcement</div>
    </router-link>
    <table style="width: 100%;">
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Details</th>
          <th>Participate</th>
          <th>Comment</th>
          <th>Actions</th>
          <th>Add Comment</th> <!-- New column header -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="announcement in announcements" :key="announcement.id">
          <td>{{ announcement.title }}</td>
          <td>{{ announcement.type }}</td>
          <td>
            <button class="details_btn" @click="openDetailModal(announcement)">Click to see the details</button>
          </td>
          <td>
            <input type="checkbox" v-model="announcement.participate" />
          </td>
          <td v-if="announcement.type === 'event'">
            <textarea v-model="announcement.comment" placeholder="Add your comment"></textarea>
          </td>
          <td v-else>-</td>
          <td>
            <button class="btn modify-btn" @click="openEditModal(announcement)">
              <i class="fa-solid fa-pen-to-square"></i> Modify
            </button>
            <button class="btn delete-btn" @click="openDeleteModal(announcement)">
              <i class="fa-solid fa-trash"></i> Delete
            </button>
          </td>
          <td>
            <input type="text" v-model="announcement.newComment" placeholder="Add a comment" />
            <button class="btn add-comment-btn" @click="addComment(announcement)">Add</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="modal-overlay" @click.self="closeModal">
      <div class="modalMD">
        <h3>Edit Announcement</h3>
        <label>Title:</label><br>
        <input v-model="selectedAnnouncement.title" type="text" /><br>

        <label>Type:</label><br>
        <input v-model="selectedAnnouncement.type" type="text" /><br>

        <label >Participate:</label>
        <input type="checkbox" v-model="selectedAnnouncement.participate" /><br>

        <label v-if="selectedAnnouncement.type === 'event'">Comment:</label><br>
        <textarea v-if="selectedAnnouncement.type === 'event'" v-model="selectedAnnouncement.comment"></textarea><br>

        <button class="btn modify-btn2" @click="saveEdit">Save</button>
        <button class="btn delete-btn2" @click="closeModal">Cancel</button>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeModal">
      <div class="modalMD">
        <h3>Are you sure you want to delete this announcement?</h3>
        <p>{{ selectedAnnouncement.title }}</p>
        <button class="btn delete-btn2" @click="confirmDelete">Yes, delete</button>
        <button class="btn modify-btn2" @click="closeModal">Cancel</button>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="showDetailModal" class="modal-overlay" @click.self="closeModal">
      <div class="modalMD dynamic-modal">
        <h3>Announcement Details</h3>
        <p>{{ selectedAnnouncement.details }}</p>
        <button class="btn modify-btn2" @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      announcements: [],
      showEditModal: false,
      showDeleteModal: false,
      showDetailModal: false,
      selectedAnnouncement: null
    };
  },
  created() {
    this.fetchAnnouncements();
  },
  methods: {
    fetchAnnouncements() {
      axios.get('http://localhost:3000/announcements')
        .then(response => {
          this.announcements = response.data.map(announcement => ({
            ...announcement,
            newComment: '' // Initialize newComment property
          }));
        })
        .catch(error => {
          console.error('Error fetching announcements:', error);
        });
    },
    openEditModal(announcement) {
      this.selectedAnnouncement = { ...announcement };
      this.showEditModal = true;
    },
    openDeleteModal(announcement) {
      this.selectedAnnouncement = { ...announcement };
      this.showDeleteModal = true;
    },
    openDetailModal(announcement) {
      this.selectedAnnouncement = { ...announcement };
      this.showDetailModal = true;
    },
    closeModal() {
      this.showEditModal = false;
      this.showDeleteModal = false;
      this.showDetailModal = false;
      this.selectedAnnouncement = null;
    },
    saveEdit() {
      axios.put(`http://localhost:3000/announcements/${this.selectedAnnouncement.id}`, this.selectedAnnouncement)
        .then(() => {
          const index = this.announcements.findIndex(a => a.id === this.selectedAnnouncement.id);
          if (index !== -1) {
            this.$set(this.announcements, index, this.selectedAnnouncement);
          }
          this.closeModal();
        })
        .catch(error => {
          console.error('Error updating announcement:', error);
        });
    },
    confirmDelete() {
      axios.delete(`http://localhost:3000/announcements/${this.selectedAnnouncement.id}`)
        .then(() => {
          this.announcements = this.announcements.filter(a => a.id !== this.selectedAnnouncement.id);
          this.closeModal();
        })
        .catch(error => {
          console.error('Error deleting announcement:', error);
        });
    },
    addComment(announcement) {
      if (announcement.newComment.trim()) {
        announcement.comments.push(announcement.newComment);
        announcement.newComment = ''; // Clear the input field
        // Optionally update the server
        axios.put(`http://localhost:3000/announcements/${announcement.id}`, announcement)
          .catch(error => {
            console.error('Error updating announcement with new comment:', error);
          });
      }
    }
  }
};
</script>




<style scoped>
.announcement-table {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 30px;
}
table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f4f4f4;
}
textarea {
  width: 100%;
  height: 60px;
}
.add_button {
  display: inline-block;
  padding: 10px 20px;
  background-color: white;
  color: green;
  border-radius: 5px;
  border: solid green;
  cursor: pointer;
  margin: 15px;
  transition: color 0.1s linear;
}
.add_button:hover {
  background-color: #28A745;
  color: white;
  border: solid white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modalMD {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: auto;
  max-width: 90%; 
  max-height: 80vh; 
  overflow-y: auto; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  word-wrap: break-word; /* Ensure words wrap to the next line */
  word-break: break-all; /* Break long words to prevent overflow */
}
.dynamic-modal {
  width: auto;
  max-width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  word-wrap: break-word; /* Ensure words wrap to the next line */
  word-break: break-all; /* Break long words to prevent overflow */
}


.btn {
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0px;
  transition: background-color 0.3s;
  display: inline-block;
  align-items: center;
}
.modify-btn {
  background-color: green;
}
.delete-btn {
  background-color: red;
}
.modify-btn2:hover {
  background-color: rgb(15, 205, 15);
}
.delete-btn2:hover {
  background-color: rgb(255, 35, 35);
}
.modify-btn2 {
  background-color: green;
  margin: 1%;
  width: 30%;
}
.delete-btn2 {
  background-color: red;
  margin: 1%;
  width: 30%;
}


.details_btn{
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0px;
  transition: background-color 0.3s;
  display: inline-block;
  align-items: center;
  background-color: #28A745;
  width: 100%;
}


.add-comment-btn {
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  padding: 5px 10px;
  border-radius: 3px;
}

.add-comment-btn:hover {
  background-color: darkblue;
}



</style>


