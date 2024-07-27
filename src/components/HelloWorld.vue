<template>
  <div>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="card-header text-center">
              جستجوی کاربر
            </div>
            <div class="card-body">
              <form>
                <div class="form-row d-flex align-items-center">
                  <div class="form-group col-md-3 ms-4">
                    <label for="username">نام کاربری</label>
                    <input type="text" class="form-control" id="username" placeholder="نام کاربری">
                  </div>
                  <div class="form-group col-md-3 ms-5">
                    <label for="nationalCode">کد ملی</label>
                    <input type="text" class="form-control" id="nationalCode" placeholder="کد ملی">
                  </div>
                  <div class="form-group col-md-3 ms-5">
                    <label for="lastName">نام خانوادگی</label>
                    <input type="text" class="form-control" id="lastName" placeholder="نام خانوادگی">
                  </div>
                  <div class="form-group col-md-3 d-flex align-items-end">
                    <button type="submit" class="btn btn-primary mt-4 ms-5">جستجو</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- دکمه برای باز کردن مدال اضافه کردن کاربر -->
    <button class="btn btn-primary mb-4 mt-2" style="margin-left: 120px;" @click="showAddUserModal = true">افزودن کاربر جدید</button>

    <!-- جدول کاربران -->
    <div class="tbl">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ردیف</th>
            <th scope="col">نام</th>
            <th scope="col">نام خانوادگی</th>
            <th scope="col">کد ملی</th>
            <th scope="col">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.nationalCode }}</td>
            <td style="width: 275px;">
              <button class="btn btn-primary" @click="showChartModal = true">
                <i class="bi bi-graph-up-arrow"></i>
              </button>
              <button class="btn btn-info" @click="viewUserDetails(index)">
                <i class="bi bi-eye"></i>
              </button>
              <button class="btn btn-warning" @click="editUser(index)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-danger" @click="confirmDeleteUser(index)">
                <i class="bi bi-trash3"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- مدال اضافه کردن کاربر -->
    <div v-if="showAddUserModal" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">افزودن کاربر جدید</h5>
            <button type="button" class="btn-close" @click="showAddUserModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addUser">
              <div class="mb-3">
                <label class="form-label">نام</label>
                <input type="text" class="form-control" v-model="newUser.firstName" required>
              </div>
              <div class="mb-3">
                <label class="form-label">نام خانوادگی</label>
                <input type="text" class="form-control" v-model="newUser.lastName" required>
              </div>
              <div class="mb-3">
                <label class="form-label">کد ملی</label>
                <input type="text" class="form-control" v-model="newUser.nationalCode" required>
              </div>
              <button type="submit" class="btn btn-primary">اضافه کردن کاربر</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showAddUserModal = false">بستن</button>
          </div>
        </div>
      </div>
    </div>

    <!-- مدال ویرایش کاربر -->
    <div v-if="showEditUserModal" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">ویرایش کاربر</h5>
            <button class="btn-close" @click="showEditUserModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateUser">
              <div class="mb-3">
                <label for="editFirstName" class="form-label">نام</label>
                <input type="text" class="form-control" v-model="userToEdit.firstName" required>
              </div>
              <div class="mb-3">
                <label for="editLastName" class="form-label">نام خانوادگی</label>
                <input type="text" class="form-control" v-model="userToEdit.lastName" required>
              </div>
              <div class="mb-3">
                <label for="editNationalCode" class="form-label">کد ملی</label>
                <input type="text" class="form-control" v-model="userToEdit.nationalCode" required>
              </div>
              <button type="submit" class="btn btn-primary">به‌روزرسانی کاربر</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showEditUserModal = false">بستن</button>
          </div>
        </div>
      </div>
    </div>

    <!-- مدال مشاهده مشخصات کاربر -->
    <div v-if="showUserDetailsModal" class="modal fade show d-block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">مشخصات کاربر</h5>
            <button type="button" class="btn-close" @click="showUserDetailsModal = false"></button>
          </div>
          <div class="modal-body">
            <p><strong>نام:</strong> {{ userToView.firstName }}</p>
            <p><strong>نام خانوادگی:</strong> {{ userToView.lastName }}</p>
            <p><strong>کد ملی:</strong> {{ userToView.nationalCode }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showUserDetailsModal = false">بستن</button>
          </div>
        </div>
      </div>
    </div>

    <!-- مدال نمودار -->
    <div v-if="showChartModal" class="modal fade show d-block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">نمودار</h5>
            <button type="button" class="btn-close" @click="showChartModal = false"></button>
          </div>
          <div class="modal-body">
            <ChartComponent />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showChartModal = false">بستن</button>
          </div>
        </div>
      </div>
    </div>

    <!-- مدال تایید حذف -->
    <div v-if="showConfirmDeleteModal" class="modal fade show d-block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">تایید حذف</h5>
            <button type="button" class="btn-close" @click="showConfirmDeleteModal = false"></button>
          </div>
          <div class="modal-body">
            آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showConfirmDeleteModal = false">بستن</button>
            <button type="button" class="btn btn-danger" @click="deleteUser">حذف</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChartComponent from '@/components/ChartComponent.vue';

const showAddUserModal = ref(false);
const showEditUserModal = ref(false);
const showChartModal = ref(false);
const showConfirmDeleteModal = ref(false);
const showUserDetailsModal = ref(false);

const users = ref([
  { firstName: 'حنانه', lastName: 'زینلی', nationalCode: '1234567890' },
  { firstName: 'زهرا', lastName: 'کاظمی', nationalCode: '0987654321' }
]);

const newUser = ref({
  firstName: '',
  lastName: '',
  nationalCode: ''
});

const userToEdit = ref({
  firstName: '',
  lastName: '',
  nationalCode: ''
});

const userToView = ref({
  firstName: '',
  lastName: '',
  nationalCode: ''
});

let userToDelete = ref(null);

const addUser = () => {
  if (newUser.value.firstName && newUser.value.lastName && newUser.value.nationalCode) {
    users.value.push({ ...newUser.value });
    newUser.value.firstName = '';
    newUser.value.lastName = '';
    newUser.value.nationalCode = '';
    showAddUserModal.value = false; // بستن مدال بعد از اضافه کردن کاربر
  }
};

const editUser = (index) => {
  userToEdit.value = { ...users.value[index] };
  userToEdit.value.index = index;
  showEditUserModal.value = true;
};

const updateUser = () => {
  if (userToEdit.value.index !== undefined) {
    users.value[userToEdit.value.index] = { 
      firstName: userToEdit.value.firstName, 
      lastName: userToEdit.value.lastName, 
      nationalCode: userToEdit.value.nationalCode 
    };
    userToEdit.value = { firstName: '', lastName: '', nationalCode: '' };
    showEditUserModal.value = false; // بستن مدال بعد از به‌روزرسانی کاربر
  }
};

const viewUserDetails = (index) => {
  userToView.value = { ...users.value[index] };
  showUserDetailsModal.value = true;
};

const confirmDeleteUser = (index) => {
  userToDelete.value = index;
  showConfirmDeleteModal.value = true;
};

const deleteUser = () => {
  if (userToDelete.value !== null) {
    users.value.splice(userToDelete.value, 1);
    userToDelete.value = null;
    showConfirmDeleteModal.value = false;
  }
};
</script>
