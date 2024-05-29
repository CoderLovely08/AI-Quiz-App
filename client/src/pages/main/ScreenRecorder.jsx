import React, { useRef, useState ,useEffect, useContext} from "react";
import axios from "axios";


function ScreenRecorder({ setResponseObject, questionId, questionText, jobRole }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const [audio, setAudio] = useState("");
  
  const startRec = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];
  
      mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };
  
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("audioData", audioBlob, "recorded_audio.wav");
        formData.append("questionText", questionText);
        formData.append("jobRole", jobRole);
      
        try {
          const response = await axios.post("https://ai-avatar-server-934aaaa51857.herokuapp.com/api/openai/transcribeAudio", formData);
          // const response = await axios.post("http://localhost:3000/api/openai/transcribeAudio", formData);
          console.log(response.data);
          setAudio(response.data.data);
          // Update response object with the response text
          setResponseObject((prev) => ({
            ...prev,
            ai_response: response.data.responseAnalysis,
            response_text: response.data.data, 
            score: response.data.score,
          }));
      
          // Now that we have the transcription data, let's fetch it
          // fetchData();
        } catch (error) {
          console.error("Error sending audio:", error);
        }
      
        // Stop media stream
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      };
      
  
      mediaRecorder.start();
      setIsRecording(true);
  
      mediaRecorderRef.current = mediaRecorder;
      mediaStreamRef.current = stream;
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  return (
    <div className="">
      <button className="" onClick={startRec}>
        <img
          className="h-12"
          src={isRecording ? "../images/save.png" : "../images/voice.png"}
          alt="Record Button"
        />
      </button>
      {isRecording && <p className="voice">Recording...</p>}
    </div>
  );
}

export default ScreenRecorder;
