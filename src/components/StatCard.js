function StatCard({ stat }) {
    const { age, gender, height, weight, goals } = stat;

    return (
        <div className="StatCard">
            <ul>
                <li>
                    Age: {age}
                </li>
                <li>
                    Gender: {gender}
                </li>
                <li>
                    Height: {height}
                </li>
                <li>
                    Weight: {weight}
                </li>
                <li>
                    Goals: {goals}
                </li>
            </ul>
        </div>
    )
}

export default StatCard;
