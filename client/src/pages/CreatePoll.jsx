import React, { useState } from "react";
import pollService from "../api/poll";
import "../styles/CreatePoll.css";

function CreatePoll() {
  const [formData, setFormData] = useState({
    question: "",
    type: "mcq",
    options: ["", ""],
    duration: 60,
    voteLimit: "",
    isResultPublic: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...formData,
        options:
          formData.type === "mcq"
            ? formData.options.filter((o) => o.trim() !== "")
            : [],
        duration: parseInt(formData.duration),
      };

      const response = await pollService.createPoll(payload);
      setMessage(`Poll created! Share link: ${response.link}`);
    } catch (error) {
      console.error(error);
      setMessage("Failed to create poll");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-container">
      <h2>Create a New Poll</h2>
      {message && <p className="status-msg">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Poll Question</label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Poll Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="mcq">MCQ</option>
            <option value="truefalse">True/False</option>
            <option value="comment">Comment</option>
          </select>
        </div>

        {formData.type === "mcq" && (
          <div className="form-group">
            <label>Options</label>
            {formData.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(i, e.target.value)}
              />
            ))}
            <button type="button" className="add-btn" onClick={addOption}>
              + Add Option
            </button>
          </div>
        )}

        {formData.type === "truefalse" && (
          <div className="form-group preview-section">
            <label>Options (Preview)</label>
            <div className="preview-box">
              <p>True</p>
              <p>False</p>
            </div>
          </div>
        )}

        {formData.type === "comment" && (
          <div className="form-group preview-section">
            <label>Comment Preview</label>
            <textarea
              placeholder="Users will type comments here..."
              disabled
            ></textarea>
          </div>
        )}

        <div className="form-group">
          <label>Duration (in minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Vote Limit (optional)</label>
          <input
            type="number"
            name="voteLimit"
            value={formData.voteLimit}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Result Visibility</label>
          <select
            name="isResultPublic"
            value={formData.isResultPublic}
            onChange={(e) =>
              setFormData({
                ...formData,
                isResultPublic: e.target.value === "true",
              })
            }
          >
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Creating..." : "Create Poll"}
        </button>
      </form>
    </div>
  );
}

export default CreatePoll;
