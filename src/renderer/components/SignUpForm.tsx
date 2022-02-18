import React, { useState } from 'react';

export function SignUpForm() {
  return (
    <div>
      <h2>Sign up</h2>
      <form>
        <label>User Name</label>
        <input type='text' />
        <label>Email</label>
        <input type='email' />
        <label>Password</label>
        <input type='password' />
        <button type='submit'>Sign up</button>
      </form>
    </div>
  );
}
