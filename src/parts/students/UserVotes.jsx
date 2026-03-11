import { useDispatch } from "react-redux";
import { voteClicked } from "./studentsSlice";

const votesObj = {
    leader: 'GL',
    captain: 'TC'
};

export const UserVotes = ({ student }) => {
    const dispatch = useDispatch();
    const userVotes = Object.entries(votesObj).map(([name, voteVal]) => {
        return (
            <button key={name} type="button" className="voting-button"
                onClick={() => dispatch(voteClicked({ studentId: student.id, vote: name }))}>
                {voteVal} {student.votes[name]}
            </button>
        )
    });

    return <div>{userVotes}</div>;
}