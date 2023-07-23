// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll("#sidebar .side-dropdown");
const sidebar = document.getElementById("sidebar");

allDropdown.forEach((item) => {
  const a = item.parentElement.querySelector("a:first-child");
  a.addEventListener("click", function (e) {
    e.preventDefault();

    const isActive = this.classList.contains("active");
    allDropdown.forEach((i) => {
      const aLink = i.parentElement.querySelector("a:first-child");

      aLink.classList.remove("active");
      i.classList.remove("show");
    });

    if (!isActive) {
      this.classList.add("active");
      item.classList.add("show");
    }
  });
});

// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector("nav .toggle-sidebar");
const allSideDivider = document.querySelectorAll("#sidebar .divider");

function updateSidebarState(hide) {
  allSideDivider.forEach((item) => {
    item.textContent = hide ? "-" : item.dataset.text;
  });

  allDropdown.forEach((item) => {
    const a = item.parentElement.querySelector("a:first-child");
    a.classList.remove("active");
    item.classList.remove("show");
  });
}

function toggleSidebarCollapse() {
  sidebar.classList.toggle("hide");
  const isSidebarHidden = sidebar.classList.contains("hide");
  updateSidebarState(isSidebarHidden);
}

toggleSidebar.addEventListener("click", toggleSidebarCollapse);

sidebar.addEventListener("mouseleave", function () {
  if (sidebar.classList.contains("hide")) {
    updateSidebarState(true);
  }
});

sidebar.addEventListener("mouseenter", function () {
  if (sidebar.classList.contains("hide")) {
    updateSidebarState(false);
  }
});

// PROFILE DROPDOWN
const profile = document.querySelector("nav .profile");
const imgProfile = profile.querySelector("img");
const dropdownProfile = profile.querySelector(".profile-link");

imgProfile.addEventListener("click", function () {
  dropdownProfile.classList.toggle("show");
});

// MENU
const allMenu = document.querySelectorAll("main .content-data .head .menu");

function toggleMenuLink() {
  const menuLink = this.parentNode.querySelector(".menu-link");
  menuLink.classList.toggle("show");
}

allMenu.forEach((item) => {
  const icon = item.querySelector(".icon");
  icon.addEventListener("click", toggleMenuLink);
});

function handleOutsideClick(e) {
  if (e.target !== imgProfile && !dropdownProfile.contains(e.target)) {
    dropdownProfile.classList.remove("show");
  }

  allMenu.forEach((item) => {
    const icon = item.querySelector(".icon");
    const menuLink = item.querySelector(".menu-link");

    if (e.target !== icon && !menuLink.contains(e.target)) {
      menuLink.classList.remove("show");
    }
  });
}

window.addEventListener("click", handleOutsideClick);

// PROGRESSBAR
const allProgress = document.querySelectorAll(".course .progress");

allProgress.forEach((item) => {
  item.style.setProperty("--value", item.dataset.value);
});

// APEXCHART
const options = {
  series: [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    height: 350,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};

// const chart = new ApexCharts(document.querySelector("#chart"), options);
// chart.render();

// new DataTable("#example");

// Calendar
const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
  });
});

// Sweet Alert
function showDialogWithPassingParams() {
  Swal.fire({
    title: "Warning!",
    text: "Are you sure this is a logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.value) {
      Swal.fire("Success!", "Logout Success.", "success");

      setTimeout(function () {
        window.location.href = "../all-courses/index.html";
      }, 1500);
    }
  });
}
