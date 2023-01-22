const deleteBookingdata = async (id) => {
  try {
    await axios({
      method: "DELETE",
      url: `http://127.0.0.1:4000/api/v1/bookings/${id}`,
    });
  } catch (err) {
    console.log(err.message);
  }
};

const clearFields = () => {
  document.getElementById("name").value = document.getElementById(
    "email"
  ).value = "";
};

const addingBooking = async (name, email) => {
  try {
    await axios({
      method: "POST",
      url: `http://127.0.0.1:4000/api/v1/bookings`,
      data: {
        name: name,
        email: email,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};

const editBooking = async (name, email, id) => {
  try {
    await axios({
      method: "PATCH",
      url: `http://127.0.0.1:4000/api/v1/bookings/${id}`,
      data: {
        name: name,
        email: email,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};

const deleteBtn = document.querySelector(".btn-delete");
const submitBtn = document.querySelector(".btn-submit");
const editBtn = document.querySelector(".btn-edit");

if (deleteBtn) {
  deleteBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = deleteBtn.dataset.set;

    await deleteBookingdata(id);
    deleteBtn.closest("tr").remove();
  });
}

const adding = async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (name && email) {
    await addingBooking(name, email);
    clearFields();
    window.location.reload();
  }
};

submitBtn.addEventListener("click", adding);
if (editBtn) {
  editBtn.addEventListener("click", async () => {
    const id = editBtn.dataset.set;

    const booking = await axios({
      method: "GET",
      url: `http://127.0.0.1:4000/api/v1/bookings/${id}`,
    });

    console.log(booking.data.data.name);
    document.getElementById("name").value = booking.data.data.name;
    document.getElementById("email").value = booking.data.data.email;
    deleteBookingdata(id);
  });
}
