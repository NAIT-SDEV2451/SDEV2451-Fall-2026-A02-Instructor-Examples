import { useState } from 'react'

export default function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()

    onSubmit({username, password})
  }


  return <form className="flex flex-col gap-4"
    onSubmit={handleSubmit}
  >
    <div className="form-control">
      <label className="label">
        <span className="label-text">Username</span>
      </label>
      <input
        type="text"
        placeholder="Enter your username"
        className="input input-bordered w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Password</span>
      </label>
      <input
        type="password"
        placeholder="Enter your password"
        className="input input-bordered w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <button type="submit" className="btn btn-primary w-full mt-2">
      Log In
    </button>
  </form>
}