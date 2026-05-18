import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import {
  pageWrapper,
  pageTitleClass,
  subHeadingClass,
  bodyText,
  primaryBtn,
  secondaryBtn,
  cardClass,
  divider,
} from "../styles/common";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <main className={`${pageWrapper} py-16`}>
      <section className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#0066cc] mb-4">
            Welcome to BlogApp
          </p>
          <h1 className={pageTitleClass}>
            Create, discover and share stories with a modern blogging experience.
          </h1>
          <p className={`${bodyText} max-w-2xl mt-6`}>
            BlogApp brings readers, authors, and admins together with a clean interface for
            browsing articles, writing posts, and managing your profile. Whether you want to
            explore new ideas or publish your next article, everything is just a click away.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            {!isAuthenticated ? (
              <>
                <button
                  type="button"
                  className={primaryBtn}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={secondaryBtn}
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={primaryBtn}
                  onClick={() => navigate(currentUser?.role === "AUTHOR" ? "/author-profile" : "/user-profile")}
                >
                  Go to Profile
                </button>
                <button type="button" className={secondaryBtn} onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        <div className={`${cardClass} border border-[#e8e8ed]`}>
          <p className="text-sm text-[#6e6e73] uppercase tracking-[0.35em] mb-4">
            App overview
          </p>
          <div className="space-y-6">
            <div>
              <h2 className={subHeadingClass}>Discover curated articles</h2>
              <p className={`${bodyText} mt-2`}>
                Browse featured content written by authors across a wide range of topics.
              </p>
            </div>
            <div>
              <h2 className={subHeadingClass}>Write your own story</h2>
              <p className={`${bodyText} mt-2`}>
                Publish articles, manage drafts, and build your author profile.
              </p>
            </div>
            <div>
              <h2 className={subHeadingClass}>Secure role-based access</h2>
              <p className={`${bodyText} mt-2`}>
                Login as a user, author, or admin to access the right dashboard and controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className={divider} />

      <section className="grid gap-8 md:grid-cols-3">
        <article className="bg-[#fafafb] rounded-3xl p-8">
          <h3 className="font-semibold text-xl text-[#1d1d1f]">Fast browsing</h3>
          <p className={`${bodyText} mt-3`}>
            Find articles quickly with a responsive homepage built for easy reading.
          </p>
        </article>
        <article className="bg-[#fafafb] rounded-3xl p-8">
          <h3 className="font-semibold text-xl text-[#1d1d1f]">Author tools</h3>
          <p className={`${bodyText} mt-3`}>
            Write, edit, and manage articles from your personal author dashboard.
          </p>
        </article>
        <article className="bg-[#fafafb] rounded-3xl p-8">
          <h3 className="font-semibold text-xl text-[#1d1d1f]">Easy access</h3>
          <p className={`${bodyText} mt-3`}>
            Login or logout from the homepage and keep control of your session.
          </p>
        </article>
      </section>
    </main>
  );
}

export default Home;