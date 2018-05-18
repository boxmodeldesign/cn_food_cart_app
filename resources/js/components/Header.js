function Header(){
    return (
        <header>
            <div className="container pt-4 pb-4">
                <h1 id="app-title">PDX Food Cart Recs</h1>
            </div>
            <article className="container mb-4">
                <p className="alert alert-info">
                    <strong>Welcome!</strong> These are some of our favorite meals from some of our favorite places to eat. The meal we suggest might not fit your dietary needs, but we recommend looking at the full menu if something piques your interest.
                </p>
            </article>
        </header>
    );
}