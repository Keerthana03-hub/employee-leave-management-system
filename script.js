function login() {
    let role = document.getElementById("role").value;

    if(role === "employee") {
        window.location.href = "employee.html";
    } else {
        window.location.href = "admin.html";
    }
}
function applyLeave(event) {
    event.preventDefault();

    let leaveType = document.getElementById("leaveType").value;
    let fromDate = document.getElementById("fromDate").value;
    let toDate = document.getElementById("toDate").value;
    let reason = document.getElementById("reason").value;

    let employeeName = localStorage.getItem("loggedInUser");

    if (fromDate > toDate) {
        alert("To Date cannot be earlier than From Date");
        return;
    }

    let leave = {
        name: employeeName,   // 👈 Added this
        type: leaveType,
        from: fromDate,
        to: toDate,
        reason: reason,
        status: "Pending"
    };

    let leaves = JSON.parse(localStorage.getItem("leaves")) || [];
    leaves.push(leave);

    localStorage.setItem("leaves", JSON.stringify(leaves));

    alert("Leave Applied Successfully!");
    document.querySelector("form").reset();
}

function goToApply() {
    window.location.href = "apply.html";
}

function goToHistory() {
    window.location.href = "history.html";
}

function logout() {
    window.location.href = "index.html";
}

function goBack() {
    window.location.href = "employee.html";
}
// Load leaves when admin page opens
if (window.location.pathname.includes("admin.html")) {
    displayLeaves();
}

function displayLeaves() {
    let leaves = JSON.parse(localStorage.getItem("leaves")) || [];
    let table = document.getElementById("leaveTable");
    table.innerHTML = "";

    leaves.forEach((leave, index) => {

        let statusClass = "";

        if (leave.status === "Pending") {
            statusClass = "status-pending";
        } else if (leave.status === "Approved") {
            statusClass = "status-approved";
        } else {
            statusClass = "status-rejected";
        }

        let row = `
            <tr>
                <td>${leave.name}</td>
                <td>${leave.type}</td>
                <td>${leave.from}</td>
                <td>${leave.to}</td>
                <td>${leave.reason}</td>
                <td class="${statusClass}">${leave.status}</td>
                <td>
                    <button class="approve-btn" onclick="approveLeave(${index})">Approve</button>
                    <button class="reject-btn" onclick="rejectLeave(${index})">Reject</button>
                </td>
            </tr>
        `;

        table.innerHTML += row;
    });
}

function approveLeave(index) {
    let leaves = JSON.parse(localStorage.getItem("leaves")) || [];
    leaves[index].status = "Approved";
    localStorage.setItem("leaves", JSON.stringify(leaves));
    displayLeaves();
}

function rejectLeave(index) {
    let leaves = JSON.parse(localStorage.getItem("leaves")) || [];
    leaves[index].status = "Rejected";
    localStorage.setItem("leaves", JSON.stringify(leaves));
    displayLeaves();
}

function goToLogin() {
    window.location.href = "index.html";
}
function login() {
    let username = document.getElementById("username").value;
    let role = document.getElementById("role").value;

    if (username === "") {
        alert("Please enter your name");
        return;
    }

    // Store logged-in user name
    localStorage.setItem("loggedInUser", username);

    if (role === "employee") {
        window.location.href = "employee.html";
    } else {
        window.location.href = "admin.html";
    }
}
function loadDashboardStats() {

    let loggedInUser = localStorage.getItem("loggedInUser");
    let leaves = JSON.parse(localStorage.getItem("leaves")) || [];

    let userLeaves = leaves.filter(leave => leave.name === loggedInUser);

    let totalLeavesTaken = userLeaves.length;

    let totalAllowedLeaves = 12;  // You can change this
    let balance = totalAllowedLeaves - totalLeavesTaken;

    document.getElementById("totalLeaves").textContent = totalLeavesTaken;
    document.getElementById("leaveBalance").textContent = balance;
}

// Auto run when dashboard opens
if (window.location.pathname.includes("employee.html")) {
    loadDashboardStats();
}
function searchLeaves() {

    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("#historyTable tr");

    rows.forEach(row => {
        let leaveType = row.cells[0]?.textContent.toLowerCase();

        if (!leaveType || leaveType.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
