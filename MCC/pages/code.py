import os
import shutil

def mvv(source_dir, destination_dir, prefix):
    # Ensure the destination directory exists
    if not os.path.exists(destination_dir):
        os.makedirs(destination_dir)
    
    # Iterate over files in the source directory
    for filename in os.listdir(source_dir):
        source_path = os.path.join(source_dir, filename)
        if os.path.isfile(source_path) and filename == prefix:  # Check for exact match
            try:
                # Move the file to the destination directory
                shutil.move(source_path, os.path.join(destination_dir, filename))
                print(f"Moved {filename} to {destination_dir}")
            except Exception as e:
                print(f"Error moving {filename}: {e}")

# Example usage
if __name__ == "__main__":
    print("\n\n-------------------------------------CUSTOM DIR MAKER------------------------------------\n")
    print("The source & destination Directory format should be like:\nC:\Projects\Web_Dev OR\nD:\Projects\my Edits\ \n")
    sd = input("The Source Directory: ")
    dd = input("The Destination Directory: ")

    while True:
        prefix = "RRR0"
        pref = input("The file prefix: ")
        prefix += pref
        mvv(sd, dd, prefix)
