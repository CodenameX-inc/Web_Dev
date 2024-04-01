export const RenderHeader = () => {

     return (
          <div className="header">
               <div className="logo">
                    <img onClick={ () => { window.location.href="/"} } src="" alt="Header"/>
               </div>
               <h1>Authentication Tutorial</h1>
          </div>
     )
}