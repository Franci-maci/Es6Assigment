import React, { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    year: "",
    hobbies: [],
    show: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        hobbies: checked
          ? [...prev.hobbies, value]
          : prev.hobbies.filter((hobby) => hobby !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const { fullname, year, hobbies, show, comments } = formData;

    if (!fullname.trim()) {
      alert("Please enter your full name");
      return false;
    }
    if (!year) {
      alert("Please select your year in school");
      return false;
    }
    if (hobbies.length === 0) {
      alert("Please select at least one sport");
      return false;
    }
    if (!show) {
      alert("Please select your favorite show");
      return false;
    }
    if (!comments.trim()) {
      alert("Please enter your comments");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
      // Reset the form after successful submit
      setFormData({
        fullname: "",
        year: "",
        hobbies: [],
        show: "",
        comments: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>At least one piece of data has to come in from every input type.</p>
      <label htmlFor="fullname">Name:</label>
      <input
        id="fullname"
        type="text"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        placeholder="Enter Full Name"
      />
      <br />
      Year in School:
      <br />
      {["First", "Second", "Third"].map((yr) => (
        <label key={yr} htmlFor={`year-${yr}`}>
          <input
            id={`year-${yr}`}
            type="radio"
            name="year"
            value={yr}
            checked={formData.year === yr}
            onChange={handleChange}
          />
          {yr}
        </label>
      ))}
      <br />
      Sports that you like:
      <br />
      {["baseball", "basketball", "football", "hockey"].map((sport) => (
        <label key={sport} htmlFor={`hobby-${sport}`}>
          <input
            id={`hobby-${sport}`}
            type="checkbox"
            name="hobbies"
            value={sport}
            checked={formData.hobbies.includes(sport)}
            onChange={handleChange}
          />
          {sport.charAt(0).toUpperCase() + sport.slice(1)}
        </label>
      ))}
      <br />
      Favorite animated comedy show:
      <select name="show" value={formData.show} onChange={handleChange}>
        <option value="">Choose Below</option>
        <option value="Family Guy">Family Guy</option>
        <option value="Simpsons">Simpsons</option>
        <option value="South Park">South Park</option>
      </select>
      <br />
      Comments:
      <br />
      <textarea
        name="comments"
        value={formData.comments}
        onChange={handleChange}
        placeholder="Enter Comments"
        rows={6}
        cols={50}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
