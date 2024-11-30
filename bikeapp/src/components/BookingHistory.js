import React, { useState, useEffect } from 'react';
import './BookingHistory.css';
import { useLocation } from 'react-router-dom';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5; // Display 5 bookings per page
  const location = useLocation();

  useEffect(() => {
    // Check if booking data is passed from Navbar and sort it by date (latest first)
    if (location.state && location.state.bookings) {
      console.log('Full response for user:', location.state.bookings); // Log the full response for debugging
      const sortedBookings = [...location.state.bookings].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setBookings(sortedBookings);
    }
  }, [location]);

  const handleClick = (booking) => {
    alert(`Clicked on booking with ID: ${booking.serviceRequestUUID}`);
  };

  // Calculate the index range for the current page
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  // Calculate total pages
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Generate pagination buttons with ellipsis
  const renderPagination = () => {
    let pages = [];
    if (totalPages <= 2) {
      // Show all pages if totalPages <= 2
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`pagination-button ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage > 1) {
        pages.push(
          <button
            key={currentPage - 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="pagination-button"
          >
            {currentPage - 1}
          </button>
        );
      }

      pages.push(
        <button key={currentPage} className="pagination-button active">
          {currentPage}
        </button>
      );

      if (currentPage < totalPages) {
        pages.push(
          <button
            key={currentPage + 1}
            onClick={() => handlePageChange(currentPage + 1)}
            className="pagination-button"
          >
            {currentPage + 1}
          </button>
        );
      }

      if (currentPage + 1 < totalPages) {
        pages.push(
          <span key="ellipsis" className="pagination-ellipsis">
            ...
          </span>
        );

        pages.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className="pagination-button"
          >
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="booking-history-container">
      <h1>Your Bookings</h1>
      <div className="content-container">
        <div className="cards-container">
          {currentBookings.length > 0 ? (
            currentBookings.map((booking) => (
              <div
                key={booking.serviceRequestUUID}
                className="booking-card"
                onClick={() => handleClick(booking)}
              >
                <p><b>Service Description:</b> {booking.serviceDescription || 'Not Available'}</p>
                <p><b>Date:</b> {booking.date}</p>
                <p><b>Status:</b> {booking.status}</p>
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
      {/* Pagination Controls */}
      {bookings.length > bookingsPerPage && (
        <div className="pagination-container">
          {currentPage > 1 && (
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
          )}
          {renderPagination()}
          {currentPage < totalPages && (
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default BookingHistory;
