import './css/style.css';

export default function Loading() {
    return (
        <div className="loading-wrapper">
            <div className="container">
                <div className="cloud front">
                    <span className="left-front" />
                    <span className="right-front" />
                </div>
                <span className="sun sunshine" />
                <span className="sun" />
                <div className="cloud back">
                    <span className="left-back" />
                    <span className="right-back" />
                </div>
            </div>
        </div>
    );
}
