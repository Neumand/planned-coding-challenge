# Planned Coding Challenge

## Technical Implementation / Decisions

### Storing Images

One of the early challenges in the assessment was deciding how to store images.

Saving blobs to a database can lead to slowdowns and latency issues. In a production environment, I would opt for a third-party cloud-based file storage system such as S3.

To accelerate development time, I opted for `IndexedDB`, a low-level API for client-side storage of files/blobs.

I uploaded the files to `IndexedDB` and saved the key to the database. When fetching memories from the DB, I used the `imageKey` property to retrieve the correct file that was uploaded.

### Sharing a Memory Lane

The sharing feature is limited to URLs.

With full-blown user authentication, creating dedicated URLs for each user's memory lane makes sense. But to go faster, I simply opted to show how I would go about implementing the share feature using the [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API).

If the API is available - validated with the `navigator.canShare()` method - the `navigator.share()` method can be called to leverage the current device's native sharing mechanisms.

For example, on iOS the share window would pop up and allow the user to share the URL directly via the app of their choice.

If the API is _not_ available - which it won't be during local development - then the URL is copied to the clipboard. I also made it clear visually to the user that the link was copied.

### Data Fetching

Given time constraints for a technical assessment, I decided to keep the initial project boilerplate intact. Meaning that I did not opt to use Next.js as a framework.

As a result, I leveraged `react-query` for data fetching.

We use RTK Query at Life House since we use Redux for state management on the Frontend.

The APIs for both libraries are similar and aim to solve the same problem: **abstracting the common problems with data fetching in React**.

It handles loading/error states, caching, and many other features that it makes little sense to use `useEffect/useState` for a client-side data fetching strategy.

I also decided to handle sorting on the server-side. In my experience, it makes most sense to pass the sort option as a query parameter to the given endpoint. That's what I did here.

### UI Components / Styling

I love Tailwind and use it for my website.

But for this technical assessment, I wanted to use a modern UI library with great design out of the box. That way, I wouldn't need to add much in terms of custom styling for the UI to look decent.

We use some of Mantine UI's helper hooks at Life House, so I decided to experiment with their component library.

I'm happy with the result. In my opinion, their `Timeline` component is a great way to depict a Memory Lane.

I kept Tailwind installed and used it in some places. In general, I wouldn't recommend this. It's better to apply styling consistently.

## Summary

It's been a while since I've done a technical assessment! It was difficult to limit my development - there's so much more I would have loved to do!

Hopefully, this work demonstrates my thinking when it comes to building great products for users.

Thanks for the opportunity!

## Screenshots

![image](https://github.com/Neumand/planned-coding-challenge/assets/42482170/cfb07b93-b388-4379-a7f9-aa3405d00a8e)

![image](https://github.com/Neumand/planned-coding-challenge/assets/42482170/d358ba23-bcb7-4ae7-9a4b-dda42ce85657)

![image](https://github.com/Neumand/planned-coding-challenge/assets/42482170/db3cdac4-e58e-4b69-8d32-6d726ef38732)

![image](https://github.com/Neumand/planned-coding-challenge/assets/42482170/afffd18a-f575-413f-96d6-1acd2f8acc66)

## Recordings

https://github.com/Neumand/planned-coding-challenge/assets/42482170/7d5e9f41-60a4-4cf5-8ce9-6fd57b7d4c77

https://github.com/Neumand/planned-coding-challenge/assets/42482170/1fc1cdd4-fd82-43b4-822e-67d7fc7a3ccc
