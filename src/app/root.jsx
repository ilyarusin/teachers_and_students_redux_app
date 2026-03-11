import { Outlet, NavLink } from "react-router-dom"

function Root() {
	return (
		<div id="main">
			<div id="menu">
				<nav>
					<NavLink to={'/students'} end>Студенты</NavLink>
					<NavLink to={'/teachers'} end>Преподаватели</NavLink>
				</nav>
			</div>
			<div id="main_page">
				<h2>Приложение для студентов и преподавателей</h2>
				<hr></hr>
                <Outlet />
			</div>
		</div>
	)
}

export default Root