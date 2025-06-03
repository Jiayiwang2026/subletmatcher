export default function Steps() {
    return (
        <section className="steps-section">
            <h2 className="steps-title">How It Works</h2>
            <div className="steps-container">
                <div className="step-card">
                    <div className="step-number">1</div>
                    <h3 className="step-title">Enter Requirements</h3>
                    <p className="step-desc">Specify dates, room type, and budget</p>
                </div>
                <div className="step-arrow">→</div>
                <div className="step-card">
                    <div className="step-number">2</div>
                    <h3 className="step-title">Smart Algorithm</h3>
                    <p className="step-desc">AI analyzes multiple matching factors</p>
                </div>
                <div className="step-arrow">→</div>
                <div className="step-card">
                    <div className="step-number">3</div>
                    <h3 className="step-title">Get Results</h3>
                    <p className="step-desc">Receive personalized match scores</p>
                </div>
            </div>

            <style jsx>{`
        .steps-section {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          padding: 50px 20px;
          margin: 40px 0;
        }

        .steps-title {
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          color: white;
          margin-bottom: 40px;
        }

        .steps-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        .step-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          padding: 25px 20px;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          flex: 1;
          min-width: 200px;
          max-width: 250px;
        }

        .step-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          margin: 0 auto 15px;
        }

        .step-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #333;
        }

        .step-desc {
          color: #666;
          line-height: 1.5;
          font-size: 14px;
        }

        .step-arrow {
          font-size: 24px;
          color: white;
          font-weight: bold;
          align-self: center;
        }

        @media (max-width: 768px) {
          .steps-container {
            flex-direction: column;
            gap: 20px;
          }
          
          .step-arrow {
            transform: rotate(90deg);
            font-size: 20px;
          }
          
          .step-card {
            max-width: 100%;
            width: 100%;
          }
          
          .steps-title {
            font-size: 24px;
          }
        }
      `}</style>
        </section>
    );
}
