import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./index.css";
import AccordionItem from "../../components/Accordion";
const faqData = [
  {
    title: "Question 1",
    description: "Answer to Question 1.",
    videoId: "rYjXlpb3t24",
  },
  {
    title: "Question 2",
    description: "Answer to Question 2.",
    videoId: "S4o2586bKok",
  },
  { title: "Question 3", description: "Answer to Question 3." },
  // Add more FAQ items as needed
];

const Faq = () => {
  return (
    <div className="faq_page">
      <Navbar white={true}></Navbar>
      <div className="content">
        <h1>Frequently Asked Questions</h1>
        <div className="accordion">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              description={
                <div className="desc_row">
                  <div>{item.description}</div>
                  <div>
                    {item.videoId && (
                      <YoutubeVideoPlayer videoId={item.videoId} />
                    )}
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Faq;

const YoutubeVideoPlayer = ({ videoId }) => {
  return (
    <div className="video-player">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};
